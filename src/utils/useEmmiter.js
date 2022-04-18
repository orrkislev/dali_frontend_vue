import { getCurrentInstance, onUnmounted } from 'vue'

export default function useEmitter() {
    const internalInstance = getCurrentInstance();
    const emitter = internalInstance.appContext.config.globalProperties.emitter;
    // return emitter;

    const subscribe = (emitName, func) => {
        emitter.on(emitName, func)

        onUnmounted(() => {
            emitter.off(emitName, func)
        })
    }

    const emit = (emitName) => emitter.emit(emitName)

    return { subscribe, emit }
}