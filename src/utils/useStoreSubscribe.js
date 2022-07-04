import { ref } from "vue";

export default function useStoreSubscribe(store, key, func) {
    store.$subscribe((mutation, state) => {
        if (mutation.events && mutation.events.key == key) func(state)
    });
}

export function useReactiveStoreVal(store, key) {
    const newRef = ref(store[key])
    store.$subscribe((mutation, state) => {
        if (mutation.events && mutation.events.key == key) newRef.value = state[key]
    });
    return newRef
}