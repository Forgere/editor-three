<template>
  <Scene>
    <Box :position="[-1,0,0]" />
    <Box :position="[1,0,0]" />
    <Model :scale="[0.01, 0.01, 0.01]"/>
  </Scene>
</template>
<script>
import {applyPureReactInVue, applyReactInVue} from 'veaury'
// This is a React component
import { Box, Scene, Model }  from 'fiber-screen-kit'
import {ref} from 'vue'

export default {
  components: {
    // Use HOC 'applyReactInVue' or 'applyPureReactInVue'
    Scene: applyPureReactInVue(Scene),
    Box: applyPureReactInVue(Box),
    Model: applyPureReactInVue(Model)
  },
  setup() {
    return {
    }
  }
}
</script>