<script>
import {defineComponent, ref} from 'vue'
import {Modal} from 'usemodal-vue3'

export default defineComponent({
  name: "ModalInfo",
  components: {Modal},
  inject: ['emitter'],
  mounted() {
    this.emitter.on('modal_info', (data) => {
      if ('open' === data.type)
        this.open_modal()

      if (undefined !== data.desc)
        this.desc = data.desc
    })
  },
  methods: {
    open_modal(){
      this.is_visible = true
      setTimeout(() => this.is_visible = false, 3000)
    }
  },
  data() {
    const desc = ref('')
    const is_visible = ref(false)
    return {desc, is_visible}
  }
})
</script>

<template>
  <div class="modal-info-wrap">
    <Modal :visible="is_visible"
           offsetTop="35%"
           title="" modalClass="modal-info">
      <div class="img"><img src="@/assets/img/icons/check.svg" alt="check"/></div>
      <div class="title">{{ $t("common.thank_you") }}!</div>
      <div class="desc">
        {{ desc ? $t(desc) : $t("common.modal_successfully_sent") }}!
      </div>
    </Modal>
  </div>
</template>

<style lang="sass">
.modal-info-wrap
  .modal-vue3-content
    border-radius: 8px!important
    background: #FFF
    box-shadow: 0 2px 4px 1px rgba(143, 130, 130, 0.25)
    width: 550px
  .modal-vue3-body
    padding: 22px!important
    text-align: center
  .modal-vue3-header, .modal-vue3-footer
    display: none!important
  .title
    font-size: 18px
    font-weight: 600
    margin: 4px auto
  .desc
    font-size: 18px
    margin: auto

</style>
