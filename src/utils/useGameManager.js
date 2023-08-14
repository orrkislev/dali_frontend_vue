import { defineStore } from 'pinia'
import useAPI from './useAPI';
import { useRouter } from 'vue-router';


const useGameManager = defineStore('game', {
    state: () => ({
        question: null,
        questionResult: null,
        game: null,
        progress: null,
        view: null,
        media: {media:null, open:false},
        extra:{},
        sel: false,
        unauthorized_types: [],
    }),
    getters: {
        isLesson: (state) => state.game.game.gameType == 'lesson',
        isLashon: (state) => state.game.domain == 'לשון',
        getPostDataForSubmitAndNext: state => {

            if (!state.questionResult) return false
            let data = {
                in_question: 1,
                correct: state.questionResult?.result ?? 0,
                timer: 1,
                fifty: state.questionResult.used5050 ? 1 : 0,
                statistics: state.questionResult.usedStats ? 1 : 0,
                quest_count: state.question.question_num,
                ScoreChange: Math.ceil(state.question.nextscore * (state.questionResult.result ?? 0)),
                type: state.question.q.type,
                question_id: state.question.q.id,
                answerlist: JSON.stringify(state.questionResult.answerlist ?? []),
                onlyData: true
            }
            return data
        },
    },
    actions: {
        // Use the value in game.next_game_id to open the task page of the next game
        NextGamePage: function() { 
            this.view = 'wait'
            this.question=null
            this.loadGameData({taskID: this.game.next_game_id, extra:''})
        },
          async loadGameData({ taskID, extra }) {
            const api = useAPI()
            const router = useRouter()
            let res = await api.post_json('tasks/task_page/', { 'game_id': taskID })
            res.extra = extra
            if (router)
                if (router.currentRoute._value.path.search('sel') > 0) this.sel = true
            this.game = res
            console.log('game type = ' + res.game.gameType)
            if (res.game.gameType == 'lesson')
                await this.startGame()
            else
                this.view = 'title'
        },
        async startGame(level = null, restart = false, extra = {}) {
            this.extra = extra
            this.question = null
            this.questionResult = null
            
            // START A NORMAL GAME
            let postdata = {
                game: this.game.game.id,
                level: 0,
                restart: restart ? 1 : 0,
                start: 1,
                gametype: this.game.game.gameType,
                name: this.game.game.name,
                purpose: 'direct_start',
                gtype: this.extra.teacher ? 'teacher_test' : (this.extra.filtered ? 'start_filter' : 'start_normal'),
                onlyData: true
            }
            // START AN EXAM
            if (this.game.extra.exam) {
                postdata.purpose = 'exam'
                postdata.game_id = this.game.extra.exam
                postdata.game = this.game.extra.exam
            }

            // START A LEVEL
            if (level) {
                postdata = {
                    game: level.id,
                    level: level.order,
                    start: 1,
                    name: level.title,
                    onlyData: true
                }
            }
            console.log('postdata='+postdata)

            const api = useAPI()
            let res = await api.post('quest/start/', postdata)
           // SHOULD SHOW LEVELS?
            if (typeof (res) == "string") {
                if (res.includes('ShowLevels')) {
                    this.view = 'title'
                    res = await api.post('quest/levels/', postdata)
                    this.game.levels = res
                    return
                }
            }

            // FREE GAMES LEFT?

            if (res?.allow === false) {
                alert('לא ניתן לשחק - סיימת את מכסת ' + res.max_allowed + ' המשחקים מסוג זה שניתן לשחק בתקופת הנסיון.')
                 console.log('not allowed')
                 this.view = 'title'
                 if (! this.unauthorized_types.includes(this.game.game.authorization_type))
                    this.unauthorized_types.push(this.game.game.authorization_type)
                return
            } else if (res?.max_allowed == res?.count + 1) { // last game
                //commit("setAlert",{type:'games-left',games:res.authorization?.max_allowed - res.authorization?.count})
                console.log('last game')
            }

            // START GAME
            res = await api.post("quest/gamehead/", { 'master': 1 })
            postdata.purpose = ''
            postdata.gametype = this.extra.teacher ? 'teacher_test' : 'start_normal'
            res = await api.post("quest/gamehead/", postdata)
            if ('nof_questions' in res) // happens when filtered game - the number may be lower then the game's normal number
            {
                this.game.game.NumQuestions = res.nof_questions
            }
            let newProgress = {
                progress: Array(this.game.game.NumQuestions).fill('notyet'),
                score: 0,
                bonus: false
            }
            if (extra?.teacher) newProgress.progress = Array(this.game.num_q_for_teacher).fill('notyet')
            if (level) {
                const levelQuestionSum = this.game.sub_games.find(sg => sg.order == level.order).game.NumQuestions
                newProgress.progress = Array(levelQuestionSum).fill('notyet'),
                    newProgress.level = level.order
            }
            newProgress.progress[0] = 'curr'
            this.progress = newProgress

            // SHOW MEDIA BEFORE QUESTION?
            if ('media' in res) {
                this.media.media = res.media
            }
            if (('media' in res) && ((this.game.domain != 'לשון' ) || (this.isLesson ))) {
                    this.view = 'media-start'
            // SHOW QUESTION
            } else {
                res = await api.post("quest/game_description/", {})
                res = await api.post("quest/buttons/", postdata)
                res = await api.post("quest/play/", { onlyData: true })
                    if (this.handlePlay(res)) return
            } 
        },
        async submitQuestion(questionResult) {
            this.questionResult = { ...this.questionResult, ...questionResult }
            if (this.progress.progress[0] == 'admin') return
            const data = this.getPostDataForSubmitAndNext
            const api = useAPI()
            const res = await api.post("quest/gamehead/", data)
            
            this.progress.score = res.score
            this.progress.progress[this.question.question_num - 1] = questionResult.result
            if (this.game.game.bonusscore > 0 && !this.game.extra.exam) {
                if (this.progress.score >= this.game.game.bonusscore && !this.progress.bonus) {
                    this.progress['bonus'] = true
                }
            }
        },
        async nextQuestion(withData = true) {
            this.media.open = false
            const api = useAPI()
            if (this.progress.progress[0] == 'admin') window.location.reload();

            const data = withData ? this.getPostDataForSubmitAndNext : {}
            const res = await api.post("quest/play/", data)
                if (this.handlePlay(res)) return
                if (res.question_num) this.progress.progress[res.question_num - 1] = 'curr'
        },
        async lifeline_retry() {
            const api = useAPI()
            this.progress.score -= this.getPostDataForSubmitAndNext.ScoreChange
            this.progress.progress[this.question.question_num - 1] = 'curr'

            
            const action = this.extra.usedRetry ? 'retry_more' : 'retry'
            let res = await api.post("quest/action/", { action , onlyData: true })
            res = await api.post("quest/action/", { action: 'reshow', question_id: this.question.q.id, onlyData: true })
            if (!this.extra.usedRetry) this.extra.usedRetry = 0
            this.extra.usedRetry++
            return this.handlePlay(res)
            //this.question = res
            //this.questionResult = {}

        },
        async lifeline_skip() {
            const api = useAPI()
            let newProgress = { ...this.progress }
            newProgress.progress[this.question.question_num - 1] = 'not_yet'
            newProgress.progress[this.question.question_num] = 'curr'
            this.progress = newProgress

            let data = this.getPostDataForSubmitAndNext
            data.timer = -1
            data.action = 'skip'
            const res = await api.post("quest/action/", data)
            return this.handlePlay(res)
            //this.question = res
            //this.questionResult = {}
        },
        async lifeline_replace() {
            const api = useAPI()
            const res = await api.post("quest/action/", { action: 'replace', onlyData: true })
            return this.handlePlay(res)
            //this.question = res
            //this.questionResult = {}
            //this.view = 'question'
        },
        handlePlay(res)  {
            this.question = res
            this.questionResult = {}
            if (res.action == 'sruvey') {
                this.view = 'survey'
                return true
            }
            else if (res.action == 'media start') {
                this.view = 'media-start'
                this.media.media = res.media
                return true
            }
            if (res.action == 'game ended') this.view = 'title'
            else if (res.action == 'next question') this.view = 'question'
            return false
        }
    }
})

export default useGameManager
