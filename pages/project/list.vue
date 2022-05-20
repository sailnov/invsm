<template>
    <v-app>
        <v-card elevation="1">
            <v-card-title>
                <span>
                    案件一覧
                </span>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="検索"
                    single-line
                    hide-details
                    dense
                    class="me-2"
                ></v-text-field>
                <v-btn color="primary" dark to="/project/create">
                    新規登録
                </v-btn>
            </v-card-title>
            <v-data-table
                dense
                :headers="headers"
                :items="items"
                :search="search"
                item-key="index"
                :footer-props="{ 'items-per-page-text': '行/ページ:' }"
                class="table-nowrap"
            >
                <template v-slot:[`item.actions`]="props">
                    <v-btn
                        text
                        :to="`/project/${props.item.id}`"
                    >
                        詳細
                    </v-btn>
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
    name: "ProjectListPage",
    head() {
        return {
            title: "案件一覧",
        };
    },
    data() {
        return {
            search: '',
            max255chars: (v) =>
                v.length <= 255 || "255文字以内で入力してください",
            items: [
                {
                    id: 1,
                    lawyer_name: "山田太郎",
                    paralegal_name: "鈴木次郎",
                    incident_at: "2020/01/01",
                    counseling_at: "2020/01/15",
                    client_name: "山田三郎",
                    client_insurance: "ABC保険",
                    client_manager: "山田史郎",
                    other_name: "山田五郎",
                    other_insurance: "DEF保険",
                    other_body_manager: "山田六郎",
                    other_object_manager: "山田七郎",
                },
            ],
            headers: [
                {
                    text: "担当弁護士",
                    align: "center",
                    sortable: false,
                    value: "lawyer_name",
                },
                {
                    text: "弊所担当者",
                    align: "center",
                    sortable: false,
                    value: "paralegal_name",
                },
                {
                    text: "事件発生日",
                    align: "center",
                    sortable: false,
                    value: "incident_at",
                },
                {
                    text: "相談日",
                    align: "center",
                    sortable: false,
                    value: "counseling_at",
                },
                {
                    text: "依頼人氏名",
                    align: "center",
                    sortable: false,
                    value: "client_name",
                },
                {
                    text: "依頼人保険会社",
                    align: "center",
                    sortable: false,
                    value: "client_insurance",
                },
                {
                    text: "依頼人担当者",
                    align: "center",
                    sortable: false,
                    value: "client_manager",
                },
                {
                    text: "相手方氏名",
                    align: "center",
                    sortable: false,
                    value: "other_name",
                },
                {
                    text: "相手方保険会社",
                    align: "center",
                    sortable: false,
                    value: "other_insurance",
                },
                {
                    text: "相手方人身担当者",
                    align: "center",
                    sortable: false,
                    value: "other_body_manager",
                },
                {
                    text: "相手方物損担当者",
                    align: "center",
                    sortable: false,
                    value: "other_object_manager",
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
        save() {
            console.log("Dialog save");
            this.$store.dispatch("snackbar/setMessage", "変更を保存しました");
            this.$store.dispatch("snackbar/snackOn");
        },
        cancel() {
            console.log("Dialog cancel");
            this.$store.dispatch(
                "snackbar/setMessage",
                "変更をキャンセルしました"
            );
            this.$store.dispatch("snackbar/snackOn");
        },
        open() {
            console.log("Dialog open");
        },
        close() {
            console.log("Dialog closed");
        },
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

<style scoped>
.table-nowrap.v-data-table {
    white-space: nowrap !important;
}
</style>
