<script>
export default {
    name: "CompanyView",
    data() {
        this.$store.dispatch('setCompany', ['desc', 'employees', 'key-values', 'slider', 'tasks'])
        return {}
    },
    methods: {
        setKeyObj(json) {
            let values = {}
            if (undefined === json)
                return values

            for (const value of Object.entries(json))
                values[value[1].id] = value[1]

            return values
        },
    },
    computed: {
        descriptions() {
            return this.setKeyObj(this.$store.getters.company.desc)
        },
        keyValuesChunks() {
            return window.objectToChunks(
                this.setKeyObj(this.$store.getters.company['key-values']), 4
            )
        },
        employeesChunks() {
            return this.$store.getters.company.employees ? window.objectToChunks(this.$store.getters.company.employees, 4) : []
        },
        slider() {
            return this.setKeyObj(this.$store.getters.company.slider)
        },
        tasks() {
            return this.setKeyObj(this.$store.getters.company.tasks)
        },
    }
}
</script>

<template>
    <div class="page-content page-company">
        <div class="container">
            <div class="block-brief single">
                <div class="title">{{ $t('header.company') }}</div>
            </div>
            <div class="list-slider">
                <div class="txt-desc" v-if="Object.keys(descriptions).length && undefined !== descriptions[1]">
                    <div class="title">{{ descriptions[1].title[$i18n.locale] }}</div>
                    <div class="brief">{{ descriptions[1].brief[$i18n.locale] }}</div>
                </div>
                <div v-if="Object.keys(slider).length">
                    <div class="slider-col slider-col-1">
                        <img :src="slider[1].img" alt="" class="img-fluid">
                        <img :src="slider[2].img" alt="" class="img-fluid">
                    </div>
                    <div class="slider-col slider-col-2">
                        <img :src="slider[3].img" alt="" class="img-fluid">
                    </div>
                    <div class="slider-col slider-col-3">
                        <div class="slider-row-1">
                            <img :src="slider[4].img" alt="" class="img-fluid">
                            <img :src="slider[5].img" alt="" class="img-fluid">
                        </div>
                        <div class="slider-row-2">
                            <img :src="slider[6].img" alt="" class="img-fluid">
                            <img :src="slider[7].img" alt="" class="img-fluid">
                        </div>
                    </div>
                    <div class="slider-col slider-col-4">
                        <img :src="slider[8].img" alt="" class="img-fluid">
                    </div>
                </div>
            </div>

            <div class="list-tasks">
                <div class="txt-desc" v-if="Object.keys(descriptions).length && undefined !== descriptions[2]">
                    <div class="title">{{ descriptions[2].title[$i18n.locale] }}</div>
                    <div class="brief">{{ descriptions[2].brief[$i18n.locale] }}</div>
                </div>
                <div v-if="Object.keys(tasks).length">
                    <ul>
                        <li v-for="task in tasks" :key="task.id">
                            <div class="inner-item">
                                <div class="img">
                                    <img :src="task.img" :alt="task.title[$i18n.locale]" class="img-fluid">
                                </div>
                                <div class="title">{{ task.title[$i18n.locale] }}</div>
                                <div class="desc">{{ task.desc[$i18n.locale] }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="list-key_values">
                <div class="txt-desc" v-if="Object.keys(descriptions).length && undefined !== descriptions[3]">
                    <div class="title">{{ descriptions[3].title[$i18n.locale] }}</div>
                    <div class="brief">{{ descriptions[3].brief[$i18n.locale] }}</div>
                </div>
                <div v-if="Object.keys(keyValuesChunks).length">
                    <ul v-for="keyValues in keyValuesChunks" :key="keyValues">
                        <li v-for="keyValue in keyValues" :key="keyValue.id">
                            <div class="inner-item" :style="{'background':keyValue.bg}">
                                <div class="name">{{ keyValue.name[$i18n.locale] }}</div>
                                <div class="desc">{{ keyValue.desc[$i18n.locale] }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="list-employees">
                <div class="txt-desc" v-if="Object.keys(descriptions).length && undefined !== descriptions[4]">
                    <div class="title">{{ descriptions[4].title[$i18n.locale] }}</div>
                    <div class="brief">{{ descriptions[4].brief[$i18n.locale] }}</div>
                </div>
                <div>
                    <ul v-for="(employees, index) in employeesChunks" :key="index">
                        <li v-for="employee in employees" :key="employee.id">
                            <div class="img">
                                <img :src="employee.img" :alt="employee.name[$i18n.locale] ?? ''" class="img-fluid">
                            </div>
                            <div class="brief">
                                <div class="name">{{ employee.name[$i18n.locale] ?? '' }}</div>
                                <div class="position">{{ employee.position }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

.page-company
    ul
        display: flex
        display: -webkit-flex
        list-style: none
        margin: 0
        padding: 0

    .txt-desc
        padding: 48px 0
        text-align: center

        .title
            font-size: 26px
            font-weight: 600
            padding-bottom: 16px
            margin: auto
            max-width: 552px

        .brief
            font-size: 16px
            max-width: 552px
            margin: auto

    .list-slider
        padding: 72px 0
        img
            display: block

        .slider-col
            display: inline-block
            padding: 0 12px
            vertical-align: top
            img
                width: 100%

        .slider-col-1
            padding-left: 0
            width: 25%
            img
                padding-bottom: 24px

        .slider-col-2
            padding-top: 48px
            width: 16.6%

        .slider-col-3
            width: 41.8%

            img
                display: inline-block

        .slider-col-4
            padding-right: 0
            padding-top: 48px
            width: 16.6%

        .slider-row-1
            img
                display: inline-block
                &:first-child
                    vertical-align: bottom
                    margin-right: 24px
                    width: calc(64% - 24px)
                &:last-child
                    width: 36%
        .slider-row-2
            padding-top: 24px
            img
                display: inline-block
                vertical-align: top
                &:first-child
                    margin-right: 24px
                    width: calc(36% - 24px)
                &:last-child
                    width: 64%

    .list-tasks
        padding-bottom: 72px
        ul
            width: 100%
        li
            flex: 25%
            padding: 12px

            &:first-child
                padding-left: 0

            &:last-child
                padding-right: 0

        .inner-item
            background: linear-gradient(360deg, rgba(196, 189, 200, 0.54) 0%, rgba(196, 189, 200, 0.00) 62.60%)
            border-radius: 12px
            height: 190px
            padding: 12px
            text-align: center

            .img
                padding-bottom: 12px

            .title
                font-size: 16px
                font-weight: 600
                padding-bottom: 8px

            .desc
                font-size: 14px
                margin: auto
                max-width: 214px

    .list-key_values
        padding-bottom: 72px
        ul
            justify-content: center
            margin: 36px 0

        li
            flex: 25%
            max-width: 25%
            padding: 0 12px

        .inner-item
            border-radius: 12px
            cursor: default
            padding: 20px 12px
            text-align: center
            &:hover
                padding: 12px
                .desc
                    display: block

        .name
            font-size: 16px
            font-weight: 600

        .desc
            display: none
            font-size: 14px
            padding-top: 8px

    .list-employees
        ul
            justify-content: flex-start
            margin: 36px 0

            &:first-child
                margin-top: 0

            &:last-child
                margin-bottom: 0

        li
            flex: 25%
            max-width: 25%
            padding: 0 12px

            &:first-child
                padding-left: 0

            &:last-child
                padding-right: 0

        .img
            background-color: #FFFAEA
            border-radius: 12px
            margin-bottom: 12px

        img
            height: 264px

        .brief
            padding: 0 8px

        .name
            color: $color_primary
            font-size: 18px
            font-weight: 600
            margin-bottom: 4px

        .position
            font-size: 16px

</style>
