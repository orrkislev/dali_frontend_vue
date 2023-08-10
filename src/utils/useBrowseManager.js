import { defineStore } from 'pinia'
// import useAPI from './useAPI';

const useBrowseManager = defineStore('browser', {
    state: () => ({
        level_list: [], 
        curr_level: -1, 
        curr_item: {},
        subject_list: [], 
        curr_subject: -1,
        game_list: null, 
        curr_game: -1,
        alltree: {},
        allkeys: [],
        my_tasks: {},
        openTasks: { tasks: [], more: [], classes:[] },
        openExams: { exams: [], more: [], classes:[] },
        isMobile: /Mobile/.test(navigator.userAgent)
    }),
    actions: {
    }
})

export default useBrowseManager
