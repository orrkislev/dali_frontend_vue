<script setup>
import { ref } from 'vue';
import useAPI from '../../utils/useAPI';
import useAuth from '../../utils/useAuth';
import ButtonSmall from '../ButtonSmall.vue';

const api = useAPI()
const auth = useAuth()
const data = ref(null)
const selected = ref(null)


api.post_json('review/survey_2_student/', {}).then(res => {
    if (res.answers)
    {
        const maxCount = res.answers.reduce((acc, cur) => {
            return acc > cur.count ? acc : cur.count
        }, 0)
        res.answers.forEach(ans => {
            ans.val = ans.count / maxCount * 100
        })
        data.value = res
    }
})

function answerSurvey(id) {
    api.post_json('review/answer_survey/', { id: id }).then(res => {
        data.value.survey.answered = true
        const allVotes = data.value.answers.reduce((acc, cur) => acc + cur.count, 0)
        const results = data.value.answers.map(a => {
            return {
                id: a.id,
                text: a.text,
                val: a.count / allVotes * 100
            }
        })
        data.value.answers = results
    })
}

const chartOptions = {
    plugins: {
        legend: {
            display: false,
            labels: {
                color: '#495057'
            }
        }
    }
}
function getChartData(){
    const datasets = [{
        data: data.value.answers.map(a => a.val),
        backgroundColor: ["#42A5F5","#66BB6A","#FFA726"],
        hoverBackgroundColor: ["#64B5F6","#81C784","#FFB74D"],
        borderWidth: 10,
        borderColor: 'rgb(57, 102, 114)',

    }]
    const labels = [...data.value.answers.map(a => a.text)]
    return {
        labels: labels,
        datasets: datasets
    }
}
</script>


<template>
    <div v-if="data && auth.username" class="sideBarElement" style="backgroundColor:#396672">
        <div class="text-white"> סקר החודש </div>
        <div class="survey-content"> {{ data.survey.text }} </div>
        <div v-if="!data.survey.answered" class="survey-answers">
            <div class="survey-answer" v-for="answer in data.answers" @click="() => selected = answer"
                :class="{ 'survey-answer-selected': selected == answer }" :key="answer.id">
                {{ answer.text }}
            </div>
            <div></div>
            <ButtonSmall v-if="selected" @click="() => answerSurvey(selected.id)"
                class="p-button-outlined p-button-sm text-blue-900">הגב</ButtonSmall>
        </div>
        <div v-else class="survey-answers">
            <Chart type="pie" :data="getChartData()" :options="chartOptions" />
            <!-- <div class="survey-answer" v-for="result in data.answers" :key="result.id">
                {{ result.text}}
                <ProgressBar :value="result.val" :showValue="false" style="height: .5em" />
            </div> -->
        </div>
    </div>
</template>


<script>
export default {
    name: 'Survey'
};
</script>


<style>
.survey-content {
    font-size: 1.2em;
    text-align: center;
    padding: 10px;
    color: white;
}

.survey-answers {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: .3em;
}

.survey-answer {
    cursor: pointer;
    transition: all .2s;
}

.survey-answer-selected {
    padding-right: 1em;
    background-color: orange;
    border-radius: .5em;
    color: black;
}
</style>