<template>
    <v-app>
        <v-card elevation="1">
            <v-card-title>
                <span>
                    保険会社一覧
                </span>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark to="/insurance/create">
                    新規登録
                </v-btn>
            </v-card-title>
            <v-data-table
                dense
                :headers="headers"
                :items="items"
                item-key="index"
                :footer-props="{ 'items-per-page-text': '行/ページ:' }"
                class="table-nowrap"
            >
                <template v-slot:[`item.label`]="props">
                    <v-edit-dialog
                        :return-value.sync="props.item.label"
                        @save="save"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                    >
                        {{ props.item.label }}
                        <template v-slot:input>
                            <v-text-field
                                v-model="props.item.label"
                                :rules="[max255chars]"
                                label="編集"
                                single-line
                                counter
                                messages="Enterで保存"
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>
                <template v-slot:[`item.zip_code`]="props">
                    <v-edit-dialog
                        :return-value.sync="props.item.zip_code"
                        @save="save"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                    >
                        {{ props.item.zip_code }}
                        <template v-slot:input>
                            <v-text-field
                                v-model="props.item.zip_code"
                                :rules="[max255chars]"
                                label="編集"
                                single-line
                                counter
                                messages="Enterで保存"
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>
                <template v-slot:[`item.address1`]="props">
                    <v-edit-dialog
                        :return-value.sync="props.item.address1"
                        @save="save"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                    >
                        {{ props.item.address1 }}
                        <template v-slot:input>
                            <v-text-field
                                v-model="props.item.address1"
                                :rules="[max255chars]"
                                label="編集"
                                single-line
                                counter
                                messages="Enterで保存"
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>
                <template v-slot:[`item.address2`]="props">
                    <v-edit-dialog
                        :return-value.sync="props.item.address2"
                        @save="save"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                    >
                        {{ props.item.address2 }}
                        <template v-slot:input>
                            <v-text-field
                                v-model="props.item.address2"
                                :rules="[max255chars]"
                                label="編集"
                                single-line
                                counter
                                messages="Enterで保存"
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>
                <template v-slot:[`item.fax`]="props">
                    <v-edit-dialog
                        :return-value.sync="props.item.fax"
                        @save="save"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                    >
                        {{ props.item.fax }}
                        <template v-slot:input>
                            <v-text-field
                                v-model="props.item.fax"
                                :rules="[max255chars]"
                                label="編集"
                                single-line
                                counter
                                messages="Enterで保存"
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>
                <template v-slot:[`item.company_name`]="props">
                    <v-edit-dialog
                        :return-value.sync="props.item.company_name"
                        @save="save"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                    >
                        {{ props.item.company_name }}
                        <template v-slot:input>
                            <v-text-field
                                v-model="props.item.company_name"
                                :rules="[max255chars]"
                                label="編集"
                                single-line
                                counter
                                messages="Enterで保存"
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>
                <template v-slot:[`item.service_center`]="props">
                    <v-edit-dialog
                        :return-value.sync="props.item.service_center"
                        @save="save"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                    >
                        {{ props.item.service_center }}
                        <template v-slot:input>
                            <v-text-field
                                v-model="props.item.service_center"
                                :rules="[max255chars]"
                                label="編集"
                                single-line
                                counter
                                messages="Enterで保存"
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>
                <template v-slot:[`item.full_address`]="props">
                    〒{{ props.item.zip_code }}<br />
                    {{ props.item.address1 }}<br />
                    {{ props.item.address2 }}
                </template>
                <template v-slot:[`item.full_company_name`]="props">
                    {{ props.item.company_name }}<br />
                    {{ props.item.service_center }}
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
    name: "InsuranceListPage",
    head() {
        return {
            title: "保険会社一覧",
        };
    },
    data() {
        return {
            max255chars: (v) =>
                v.length <= 255 || "255文字以内で入力してください",
            items: [
                {
                    id: 1,
                    label: "AIG　茨城　第一課",
                    zip_code: "310-0805",
                    address1: "茨城県水戸市中央2丁目6-29",
                    address2: "富士火災水戸ビル",
                    fax: "029-231-8012",
                    company_name: "AIG損害保険株式会社",
                    service_center: "茨城サービスセンター第一課",
                },
                {
                    id: 2,
                    label: "JA　つくば",
                    zip_code: "305-0005",
                    address1: "茨城県つくば市天久保２丁目４−１２",
                    address2: "",
                    fax: "029-858-4010",
                    company_name: "全国共済農業協同組合連合会 茨城県本部",
                    service_center: "つくば自動車損害調査サービスセンター",
                },
                {
                    id: 3,
                    label: "JA　 水戸",
                    zip_code: "310-0022",
                    address1: "茨城県水戸市梅香１－５－１８",
                    address2: "",
                    fax: "029-224-0829",
                    company_name: "全国共済農業協同組合連合会 茨城県本部",
                    service_center: "自動車損害調査部　水戸サービスセンター",
                },
                {
                    id: 4,
                    label: "SBI １部人傷搭傷",
                    zip_code: "150-0043",
                    address1: "東京都渋谷区道玄坂１－１０－８",
                    address2: "渋谷道玄坂東急ビル７Ｆ",
                    fax: "03-6685-0301",
                    company_name: "SBI損害保険株式会社",
                    service_center: "１部人傷搭傷サービスセンター",
                },
                {
                    id: 5,
                    label: "あいおい　鹿島",
                    zip_code: "314-0031",
                    address1: "茨城県つくば市宮中２－６－２６",
                    address2: "あいおいニッセイ同和損保鹿島ビル",
                    fax: "0299-83-9096",
                    company_name: "あいおいニッセイ同和損害保険株式会社",
                    service_center: "鹿島サービスセンター",
                },
                {
                    id: 6,
                    label: "あいおい　下館",
                    zip_code: "308-0054",
                    address1: "茨城県筑西市西谷貝326-1",
                    address2: "あいおいニッセイ同和損保下館ビル",
                    fax: "0296-25-1065",
                    company_name: "あいおいニッセイ同和損害保険株式会社",
                    service_center: "下館サービスセンター",
                },
                {
                    id: 7,
                    label: "あいおい　新宿第二",
                    zip_code: "151-8790",
                    address1: "東京都渋谷区代々木3-25-3",
                    address2: "あいおいニッセイ同和損保新宿ビル15F",
                    fax: "03-3299-8582",
                    company_name: "あいおいニッセイ同和損害保険株式会社",
                    service_center: "新宿第二サービスセンター",
                },
                {
                    id: 8,
                    label: "あいおい　つくば",
                    zip_code: "305-0817",
                    address1: "茨城県つくば市研究学園６－６９－１",
                    address2: "",
                    fax: "029-856-9940",
                    company_name: "あいおいニッセイ同和損害保険株式会社",
                    service_center: "つくばサービスセンター",
                },
                {
                    id: 9,
                    label: "ABC保険",
                    zip_code: "305-0817",
                    address1: "茨城県つくば市研究学園６－６９－１",
                    address2: "",
                    fax: "029-856-9940",
                    company_name: "ABC保険株式会社",
                    service_center: "ABCサービスセンター",
                },
                {
                    id: 10,
                    label: "DEF保険",
                    zip_code: "305-0817",
                    address1: "茨城県つくば市研究学園６－６９－１",
                    address2: "",
                    fax: "029-856-9940",
                    company_name: "DEF保険株式会社",
                    service_center: "DEFサービスセンター",
                },
                {
                    id: 11,
                    label: "AOA保険",
                    zip_code: "305-0817",
                    address1: "茨城県つくば市研究学園６－６９－１",
                    address2: "",
                    fax: "029-856-9940",
                    company_name: "AOA保険株式会社",
                    service_center: "AOAサービスセンター",
                },
            ],
            headers: [
                {
                    text: "選択肢ラベル",
                    align: "center",
                    sortable: false,
                    value: "label",
                },
                {
                    text: "郵便番号",
                    align: "center",
                    sortable: false,
                    value: "zip_code",
                },
                {
                    text: "住所１",
                    align: "center",
                    sortable: false,
                    value: "address1",
                },
                {
                    text: "住所２",
                    align: "center",
                    sortable: false,
                    value: "address2",
                },
                {
                    text: "FAX番号",
                    align: "center",
                    sortable: false,
                    value: "fax",
                },
                {
                    text: "会社名",
                    align: "center",
                    sortable: false,
                    value: "company_name",
                },
                {
                    text: "サービスセンター",
                    align: "center",
                    sortable: false,
                    value: "service_center",
                },
                {
                    text: "住所",
                    align: "left",
                    sortable: false,
                    value: "full_address",
                },
                {
                    text: "会社・サービスセンター",
                    align: "left",
                    sortable: false,
                    value: "full_company_name",
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
