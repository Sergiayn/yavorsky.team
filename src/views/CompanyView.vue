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
        screenWidth() {
            return this.$store.getters.screen_width
        }
    },
    computed: {
        descriptions() {
            return this.setKeyObj(this.$store.getters.company.desc)
        },
        keyValuesChunks() {
            return window.objectToChunks(
                this.setKeyObj(this.$store.getters.company['key-values']), 8
            )
        },
        employeesChunks() {
            let size
            if (this.screenWidth() > 576)
                size = 4
            else
                size = 2
            return this.$store.getters.company.employees ? window.objectToChunks(this.$store.getters.company.employees, size) : []
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
                            <div class="item">
                                <div class="inner-item" :style="{'background':keyValue.bg}">
                                    <div class="name">{{ keyValue.name[$i18n.locale] }}</div>
                                    <div class="desc">{{ keyValue.desc[$i18n.locale] }}</div>
                                </div>
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
                    <ul v-for="(employees, indexChunk) in employeesChunks" :key="indexChunk">
                        <li v-for="(employee) in employees" :key="employee.id">
                            <div class="employee">
                                <div class="img">
                                    <img :src="employee.img" :alt="employee.name[$i18n.locale] ?? ''" class="img-fluid">
                                </div>
                                <div class="brief">
                                    <div class="name">{{ employee.name[$i18n.locale] ?? '' }}</div>
                                    <div class="position">{{ employee.position }}</div>
                                </div>
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
        gap: 24px
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
            justify-content: center
            width: 100%

        li
            flex: 1

        .inner-item
            background: linear-gradient(360deg, rgba(196, 189, 200, 0.54) 0%, rgba(196, 189, 200, 0.00) 62.60%)
            border-radius: 12px
            height: 100%
            padding: 12px 12px 24px
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
            gap: 0
            flex-wrap: wrap
            justify-content: center
            margin: 36px 0

        li
            flex: 1 0 21%
            max-width: 25%
            padding: 0
            position: relative

            .item
                padding: 0 12px
                height: 150px

            .inner-item
                position: absolute
                width: calc(100% - 24px)

            &:hover
                .desc
                    display: block

                    -webkit-transition: max-height 3s
                    -moz-transition: max-height 3s
                    -ms-transition: max-height 3s
                    -o-transition: max-height 3s
                    transition: max-height 3s
                    max-height: 300px

        .inner-item
            border-radius: 12px
            cursor: default
            padding: 20px 12px
            text-align: center
            width: 100%

        .name
            font-size: 16px
            font-weight: 600

        .desc
            //display: none
            font-size: 14px
            padding-top: 8px

            overflow: hidden
            max-height: 0

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

        .img
            background-color: #FFFAEA
            border-radius: 12px
            margin: 0 auto 12px
            display: flex
            justify-content: center

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

@media (max-width: 1200px)
    .page-company
        ul
            gap: 22px

        .list-tasks
            .inner-item
                padding: 12px

        .list-key_values
            ul
                margin: 0

            li
                flex: 1 0 33.33%
                max-width: none

                .item
                    display: table
                    height: 100%
                    padding: 11px
                    width: 100%

                .inner-item
                    display: table-cell
                    height: 100%
                    position: static
                    vertical-align: middle
                    width: 100%

                .desc
                    max-height: none

        .list-slider
            padding: 60px 0

        .list-employees
            img
                height: 220px

@media (max-width: 991px)
    .page-company
        ul
            gap: 16px

        .list-tasks
            .inner-item
                img
                    height: 48px
                    width: 48px

        .list-key_values
            li
                flex: 1 0 50%

                .item
                    padding: 10px

        .list-slider
            padding: 30px 0

        .list-employees
            ul
                gap: 16px

            .name
                font-size: 16px

            .position
                font-size: 14px

            img
                height: 156px

@media (max-width: 768px)
    .page-company
        .list-slider
            .slider-col
                padding: 0 6px
            .slider-col-1
                img
                    padding-bottom: 16px
            .slider-col-2
                padding-top: 16px

            .slider-col-4
                padding-top: 16px

            .slider-row-1
                img
                    &:first-child
                        margin-right: 16px
                        width: calc(64% - 16px)

            .slider-row-2
                padding-top: 16px
                img
                    &:first-child
                        margin-right: 16px
                        width: calc(36% - 16px)

        .list-key_values
            padding-bottom: 50px

            li
                .item
                    padding: 8px

        .list-employees
            img
                height: 120px

@media (max-width: 576px)
    .page-company
        .txt-desc
            padding: 40px 0

            .title
                font-size: 20px

        .list-slider
            padding: 0 0 40px
            .slider-col
                padding: 0 3px
            .slider-col-1
                img
                    padding-bottom: 8px
            .slider-col-2
                padding-top: 8px

            .slider-col-4
                padding-top: 8px
            .slider-row-1
                img
                    &:first-child
                        margin-right: 8px
                        width: calc(64% - 8px)

            .slider-row-2
                padding-top: 8px
                img
                    &:first-child
                        margin-right: 8px
                        width: calc(36% - 8px)

        .list-tasks
            padding-bottom: 30px

            .txt-desc
                padding-bottom: 32px

            ul
                flex-wrap: wrap

            li
                flex-basis: calc(50% - 16px)

        .list-key_values
            padding-bottom: 24px

            ul
                display: block
                column-count: 2

            li
                break-inside: avoid

        .list-employees
            li
                flex: 50%
                max-width: 50%

            .employee
                max-width: 156px
                margin: auto

                img
                    height: 156px

@media (max-width: 350px)
    .page-company
        .list-key_values
            ul
                column-count: 1

        .list-employees
            .employee
                max-width: 120px
                img
                    height: 120px


</style>
