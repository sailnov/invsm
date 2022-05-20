<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
            permanent
        >
            <v-list dense>
                <div v-for="(item, i) in items" :key="i">
                    <v-list-group
                        :value="false"
                        :tooltip="item.title"
                        v-if="item.hasChild"
                    >
                        <template v-slot:prependIcon>
                            <v-tooltip right v-if="miniVariant">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        {{ item.icon }}
                                    </v-icon>
                                </template>
                                <span>{{ item.title }}</span>
                            </v-tooltip>
                            <v-icon v-else>{{ item.icon }}</v-icon>
                        </template>
                        <template v-slot:activator>
                            <v-list-item-title v-text="item.title" />
                        </template>
                        <v-list-item
                            color="primary"
                            v-for="(childitem, i) in item.child"
                            :to="childitem.to"
                            :key="i"
                            sub-group
                        >
                            <v-list-item-action>
                                <v-tooltip right v-if="miniVariant">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                            {{ childitem.icon }}
                                        </v-icon>
                                    </template>
                                    <span>{{ childitem.title }}</span>
                                </v-tooltip>
                                <v-icon v-else>{{ childitem.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title v-text="childitem.title" />
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item
                        color="primary"
                        :to="item.to"
                        :key="i"
                        v-else
                    >
                        <v-list-item-action>
                            <v-tooltip right v-if="miniVariant">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        {{ item.icon }}
                                    </v-icon>
                                </template>
                                <span>{{ item.title }}</span>
                            </v-tooltip>
                            <v-icon v-else>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" />
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar :clipped-left="clipped" fixed app dense elevation="0">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon
                    >mdi-{{
                        `chevron-${miniVariant ? "right" : "left"}`
                    }}</v-icon
                >
            </v-btn>
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <v-btn icon @click.stop="rightDrawer = !rightDrawer">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main>
            <v-container>
                <Nuxt />
            </v-container>
        </v-main>
        <v-navigation-drawer
            v-model="rightDrawer"
            :right="right"
            temporary
            fixed
        >
            <v-list>
                <v-list-item @click.native="right = !right">
                    <v-list-item-action>
                        <v-icon light> mdi-repeat </v-icon>
                    </v-list-item-action>
                    <v-list-item-title
                        >Switch drawer (click me)</v-list-item-title
                    >
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-footer :absolute="!fixed" app>
            <span>&copy; {{ new Date().getFullYear() }} LeeTech.</span>
        </v-footer>
        <v-snackbar
            v-model='snackbarVisible'
            :timeout='3000'
        >
            {{ this.$store.getters['snackbar/message'] }}
            <template v-slot:action="{ attrs }">
                <v-btn
                color="primary"
                text
                v-bind="attrs"
                @click="snackbarVisible = false"
                >
                閉じる
                </v-btn>
            </template>
        </v-snackbar>
    </v-app>
</template>

<script>
export default {
    name: "DefaultLayout",
    data() {
        return {
            clipped: true,
            miniVariant: false,
            drawer: false,
            fixed: true,
            items: [
                {
                    icon: "mdi-home-outline",
                    title: "ホーム",
                    hasChild: false,
                    to: "/",
                },
                {
                    icon: "mdi-folder-cog-outline",
                    title: "案件管理",
                    hasChild: true,
                    child: [
                        {
                            icon: "mdi-folder-plus-outline",
                            title: "案件登録",
                            to: "/project/create",
                        },
                        {
                            icon: "mdi-folder-text-outline",
                            title: "案件一覧",
                            to: "/project/list",
                        },
                    ],
                },
                {
                    icon: "mdi-store-cog-outline",
                    title: "保険会社管理",
                    hasChild: true,
                    child: [
                        {
                            icon: "mdi-store-plus-outline",
                            title: "保険会社登録",
                            to: "/insurance/create",
                        },
                        {
                            icon: "mdi-store-settings-outline",
                            title: "保険会社一覧",
                            to: "/insurance/list",
                        },
                    ],
                },
                {
                    icon: "mdi-account-cog-outline",
                    title: "アカウント管理",
                    hasChild: true,
                    child: [
                        {
                            icon: "mdi-account-plus-outline",
                            title: "アカウント登録",
                            to: "/account/create",
                        },
                        {
                            icon: "mdi-account-settings-outline",
                            title: "アカウント一覧",
                            to: "/account/list",
                        },
                    ]
                }
            ],
            right: true,
            rightDrawer: false,
            title: "顧客情報管理システム",
        };
    },
    computed: {
        snackbarVisible: {
            get() {
                return this.$store.state.snackbar.isEnable
            },
            set() {
                return this.$store.dispatch('snackbar/snackOff')
            }
        }
    },
};
</script>
