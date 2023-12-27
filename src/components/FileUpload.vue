<script setup>
import { inject, reactive, watch } from 'vue'
import { useDropzone } from 'vue3-dropzone'
const emitter = inject('emitter')
const state = reactive({files: []})

const { getRootProps, getInputProps, isDragActive, ...rest } = useDropzone({onDrop})

// watch(state, () => console.log(state.files))
watch(isDragActive, () => console.log('isDragActive', isDragActive.value, rest))

function onDrop(acceptFiles) {
    let files = []
    acceptFiles.forEach((file) => {
        if (file.size < 5000000 && files.length < 5)
            files.push(file)
    })

    setTimeout(() => {
        const dt = new DataTransfer()
        const fileInput = document.getElementById('inp-files')
        files.forEach((file) => dt.items.add(file))
        fileInput.files = dt.files
    }, 10)

    state.files = files
}

function handleClickDeleteFile(index) {
    state.files.splice(index, 1)
}
emitter.on('file_upload', (data) => {
    if ('clear' === data.type)
        state.files.splice(0)
})
</script>

<template>
    <div class="file-upload">
        <div v-if="state.files.length > 0" class="files">
            <input type="file" name="files" id="inp-files" style="display: none" />
            <div class="file-item" v-for="(file, index) in state.files" :key="index">
                <span>{{ file.name }}</span>
                <span class="delete-file" @click="handleClickDeleteFile(index)"
                >Delete</span>
            </div>
        </div>
        <div v-else class="dropzone" v-bind="getRootProps()">
            <div>
                <input v-bind="getInputProps()" />
                <div class="img">
                    <img src="@/assets/img/icons/upload.svg"
                         :alt="$t('common.contact_form__file_desc_1') + ' ' + $t('common.contact_form__file_desc_2')">
                </div>
                <div class="desc">{{ $t('common.contact_form__file_desc_1') }}</div>
                <div class="choice-file">{{ $t('common.contact_form__file_desc_2') }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
@import "@/assets/color"
.file-upload
    border-radius: 12px
    border: 1px dashed $color_secondary
    font-size: 14px
    margin-bottom: 24px
    padding: 22px
    text-align: center

    .img
        margin-bottom: 10px

    .choice-file
        color: $color_primary
        cursor: pointer
        margin: 2px 0

.dropzone,
.files
    width: 100%
    max-width: 300px
    margin: 0 auto
    padding: 10px
.file-item
    border-radius: 8px
    display: flex
    align-items: center
    justify-content: flex-end
    padding: 7px
    padding-left: 15px
    margin-top: 10px
    &:first-child
        margin-top: 0
    .delete-file
        margin-left: 10px
.delete-file
    background: red
    color: #fff
    padding: 5px 10px
    border-radius: 8px
    cursor: pointer

</style>
