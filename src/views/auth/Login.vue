<template>
    <div class="bg-[url('../assets/img/start.png')] bg-[length:120px_120px] bg-center bg-slate-100 bg-repeat-space">
        <div class="flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-md space-y-8 bg-white p-10 shadow rounded-md">
                <div>
                    <img class="h-24 mx-auto w-auto rounded-md" src="../../assets/img/smkn2.png" alt="Your Company" />
                    <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
                        Selamat Datang
                    </h2>
                </div>
                <form class="mt-4 space-y-6" action="#" method="POST" @submit.prevent="login">
                    <input type="hidden" name="remember" value="true" />
                    <div class="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label for="email-address" class="sr-only">Username</label>
                            <input id="username" name="username" type="text" required
                                class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Username" v-model="form.username" />
                        </div>
                        <div>
                            <label for="password" class="sr-only">Password</label>
                            <input id="password" name="password" type="password" autocomplete="current-password"
                                required
                                class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password" v-model="form.password" />
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon class="h-5 w-5 text-white" aria-hidden="true" />
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { LockClosedIcon } from "@heroicons/vue/24/outline";
    import { reactive } from "vue";
    // import useAuth from "../../services/authentication";

    const form = reactive({
        username: "admin",
        password: "admin",
    });

// const { doRegister, btn } = useAuth();

// const login = async () => {
//     doRegister({ ...form });
// };
</script>