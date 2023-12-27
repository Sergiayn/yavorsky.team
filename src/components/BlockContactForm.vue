<script>
import {defineComponent, ref} from 'vue'
import FileUpload from '@/components/FileUpload'

export default defineComponent({
    name: "BlockContactForm",
    props: {
        has_file_upload: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    data() {
        const clearFiles = ref(false)
        return {
            clearFiles,
            errors: [],
            name: '',
            email: '',
            comment: '',
        };
    },
    inject: ['emitter'],
    components: {FileUpload},
    methods: {
        checkForm: function (e) {
            e.preventDefault()

            this.errors = []

            if (!this.name)
                this.errors.push('Требуется указать имя.')

            let formData = new FormData()
            formData.append('name', this.name)
            formData.append('email', this.email)
            formData.append('comment', this.comment)

            const fileInput = document.getElementById('inp-files')
            if (null !== fileInput && null !== fileInput.files)
            {
                for (var i = 0; i < fileInput.files.length; i++) {
                    formData.append('files[]', fileInput.files[i]);
                }
            }
            const requestOptions = {
                method: "POST",
                body: formData,
                mode: "no-cors"
            }

            try {
                fetch("https://dev.api.yavorsky.team.galaxys.info/v1/contact", requestOptions)
                    .then(() => {
                        this.emitter.emit('modal_info', {type: 'open', desc: this.$t('common.modal_successfully_submitted')})
                        this.name = ''
                        this.email = ''
                        this.comment = ''
                        this.emitter.emit('file_upload', {type: 'clear'})
                    })
            } catch (e) {
                console.warn(e.toString())
            }
        }
    }
})
</script>
<template>
    <div class="contact-form">
        <form
            @submit="checkForm"
            action="#"
            method="post"
        >
            <p v-if="errors.length">
                <b>{{ $t('common.message_show_all_errors') }}:</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
            </p>
            <div class="row">
                <div class="col-6">
                    <p>
                        <input
                            required
                            class="form-control"
                            v-model="name"
                            type="text"
                            name="name"
                            :placeholder="$t('common.name')"
                        >
                    </p>
                </div>
                <div class="col-6">
                    <p>
                        <input
                            required
                            class="form-control"
                            v-model="email"
                            type="email"
                            name="email"
                            :placeholder="$t('common.email')"
                        >
                    </p>
                </div>
            </div>
            <p>
              <textarea
                  required
                  class="form-control"
                  v-model="comment"
                  name="comment"
                  :placeholder="$t('common.form_comment')"
              >
              </textarea>
            </p>
            <div v-if="has_file_upload">
                <FileUpload />
            </div>
            <div class="row">
                <div class="col-8">
                    <p class="link-purplle">
                        <span>{{ $t('common.i_agree_with_1') }}</span>&nbsp;<router-link :to="{name:'PrivacyPolicy', params:{locale:$i18n.locale}}">{{ $t('common.i_agree_with_2') }}</router-link>
                    </p>
                </div>
                <div class="col-4">
                    <p>
                        <input
                            class="btn btn-primary"
                            type="submit"
                            :value="$t('common.send')"
                        >
                    </p>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped lang="sass">
@import "@/assets/color"

.contact-form
    p
        margin-bottom: 24px

    textarea
        height: 125px

    input[type="submit"]
        float: right

    form .link-purplle
        margin: 10px 0 0

</style>
