<template>
    <v-app>
        <v-card
            elevation="1"
        >
            <v-card-title>
                    <span>
                        アカウント一覧
                    </span>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        dark
                        to="/account/create"
                    >
                        新規登録
                    </v-btn>
            </v-card-title>
            <v-data-table
                dense
                :headers="headers"
                :items="items"
                item-key="id"
                :footer-props="{ 'items-per-page-text': '行/ページ:' }"
            >
                <template v-slot:[`item.is_lawyer`]="{ item }">
                    <v-simple-checkbox
                        v-model="item.is_lawyer"
                        disabled
                    ></v-simple-checkbox>
                </template>
                <template v-slot:[`item.is_paralegal`]="{ item }">
                    <v-simple-checkbox
                        v-model="item.is_paralegal"
                        disabled
                    ></v-simple-checkbox>
                </template>
                <template v-slot:[`item.is_admin`]="{ item }">
                    <v-simple-checkbox
                        v-model="item.is_admin"
                        disabled
                    ></v-simple-checkbox>
                </template>
                <template v-slot:[`item.is_active`]="{ item }">
                    <v-simple-checkbox
                        v-model="item.is_active"
                        disabled
                    ></v-simple-checkbox>
                </template>
                <template v-slot:[`item.actions`]="props">
                    <v-icon small @click="deleteItem(props.item)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card class="text-center">
                    <v-card-title class="text-h5">
                        <v-spacer></v-spacer>
                        確認
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-text>
                        このデータを本当に削除しますか？
                        <span class="red--text d-block">
                            削除すると元に戻せません。
                        </span>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text @click="closeDelete"
                            >キャンセル</v-btn
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteItemConfirm"
                            >削除</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
    </v-app>
</template>

<script>
export default {
    name: "AccountListPage",
    head() {
        return {
            title: "アカウント一覧",
        };
    },
    data() {
        return {
            items: [
                {
                    id: 1,
                    lastname: "山田",
                    firstname: "太郎",
                    email: "taro@example.com",
                    phone: "090-1111-1111",
                    is_lawyer: true,
                    is_paralegal: true,
                    is_admin: true,
                    is_active: true,
                },
                {
                    id: 2,
                    lastname: "山田",
                    firstname: "次郎",
                    email: "jiro@example.com",
                    phone: "090-2222-2222",
                    is_lawyer: true,
                    is_paralegal: true,
                    is_admin: false,
                    is_active: true,
                },
                {
                    id: 3,
                    lastname: "山田",
                    firstname: "三郎",
                    email: "saburo@example.com",
                    phone: "090-3333-3333",
                    is_lawyer: true,
                    is_paralegal: true,
                    is_admin: false,
                    is_active: true,
                },
                {
                    id: 4,
                    lastname: "山田",
                    firstname: "四郎",
                    email: "siro@example.com",
                    phone: "090-4444-4444",
                    is_lawyer: true,
                    is_paralegal: true,
                    is_admin: false,
                    is_active: true,
                },
                {
                    id: 5,
                    lastname: "山田",
                    firstname: "五郎",
                    email: "goro@example.com",
                    phone: "090-5555-5555",
                    is_lawyer: false,
                    is_paralegal: true,
                    is_admin: false,
                    is_active: true,
                },
                {
                    id: 6,
                    lastname: "山田",
                    firstname: "六郎",
                    email: "rokuro@example.com",
                    phone: "090-6666-6666",
                    is_lawyer: false,
                    is_paralegal: true,
                    is_admin: false,
                    is_active: true,
                },
            ],
            headers: [
                {
                    text: "氏",
                    align: "center",
                    sortable: false,
                    value: "lastname",
                },
                {
                    text: "名",
                    align: "center",
                    sortable: false,
                    value: "firstname",
                },
                {
                    text: "メールアドレス",
                    align: "center",
                    sortable: false,
                    value: "email",
                },
                {
                    text: "電話番号",
                    align: "center",
                    sortable: false,
                    value: "phone",
                },
                {
                    text: "弁護士アカウント",
                    align: "center",
                    sortable: false,
                    value: "is_lawyer",
                },
                {
                    text: "担当者アカウント",
                    align: "center",
                    sortable: false,
                    value: "is_paralegal",
                },
                {
                    text: "管理者アカウント",
                    align: "center",
                    sortable: false,
                    value: "is_admin",
                },
                {
                    text: "ステータス",
                    align: "center",
                    sortable: false,
                    value: "is_active",
                },
                {
                    text: "操作",
                    align: "center",
                    sortable: false,
                    value: "actions",
                },
            ],
            deleteIndex: -1,
            dialogDelete: false,
        };
    },
    methods: {
        deleteItem(item) {
            this.deleteIndex = this.items.indexOf(item);
            this.dialogDelete = true;
        },
        deleteItemConfirm() {
            this.items.splice(this.deleteIndex, 1);
            this.dialogDelete = false;
        },
        closeDelete() {
            this.dialogDelete = false;
        },
    },
};
</script>
