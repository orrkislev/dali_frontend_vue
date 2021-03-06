import { defineStore } from 'pinia'
// import useAPI from './useAPI';

const useBrowseManager = defineStore('browser', {
    state: () => ({
        level_list: [], curr_level: -1,
        subject_list: [], curr_subject: -1,
        game_list: null, curr_game: -1,
        openTasks: { tasks: [], more: [], classes:[] },
        openExams: { exams: [], more: [], classes:[] },
    }),
    actions: {
    }
})

export default useBrowseManager
