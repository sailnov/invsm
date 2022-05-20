<template>
    <v-app>
        <v-card elevation="1">
            <v-form v-model="valid">
                <v-card-title>
                    案件登録
                </v-card-title>
                <v-container>
                    <v-row>
                        <v-col cols="6" md="6">
                            <v-select
                                :items="get_lawyers()"
                                label="担当弁護士"
                                dense
                            ></v-select>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-select
                                :items="get_paralegals()"
                                label="弊所担当者"
                                dense
                            ></v-select>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="date"
                                        label="事故発生日"
                                        persistent-hint
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="date"
                                    no-title
                                    @input="menu2 = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-menu
                                v-model="menu3"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="date2"
                                        label="相談日"
                                        persistent-hint
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="date2"
                                    no-title
                                    @input="menu3 = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-menu
                                ref="menu4"
                                v-model="menu4"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="time"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="time"
                                        label="相談開始時間"
                                        prepend-icon="mdi-clock-time-four-outline"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="menu4"
                                    v-model="time"
                                    full-width
                                    @click:minute="$refs.menu4.save(time)"
                                ></v-time-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-menu
                                ref="menu5"
                                v-model="menu5"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="time2"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="time2"
                                        label="相談終了時間"
                                        prepend-icon="mdi-clock-time-four-outline"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="menu5"
                                    v-model="time2"
                                    full-width
                                    @click:minute="$refs.menu5.save(time2)"
                                ></v-time-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-text-field
                                label="依頼人・氏"
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-text-field
                                label="依頼人・名"
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-text-field
                                label="依頼人・電話番号"
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-text-field
                                label="依頼人・生年月日"
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-text-field
                                label="依頼人・郵便番号"
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-text-field
                                label="依頼人・住所"
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-select
                                :items="get_insurance()"
                                label="弁特保険会社"
                                dense
                            ></v-select>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-text-field
                                label="保険担当者氏名"
                                dense
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-btn text @click="resetForm">
                        キャンセル
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        :disabled="!valid"
                        text
                        color="primary"
                        type="button"
                        @click="okform"
                    >
                        新規登録
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-app>
</template>

<script>
export default {
    name: "InsuranceAddPage",
    head() {
        return {
            title: "案件登録",
        };
    },
    data() {
        return {
            valid: false,
            menu2: false,
            menu3: false,
            menu4: false,
            menu5: false,
            menu6: false,
            time: null,
            time2: null,
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10),
            date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10),
            lawyer_name: "",
            paralegal_name: "",
            incident_at: "",
            counseling_at: "",
            counseling_start_time: "",
            counseling_end_time: "",
            client_name: "",
            client_zipcode: "",
            client_address: "",
            client_tel: "",
            client_birthday: "",
            client_insurance: "",
            client_manager: "",
            other_name: "",
            other_insurance: "",
            other_body_manager: "",
            other_object_manager: "",
            other_liability: "",
            rules: {
                required: (value) => !!value || "必須項目です",
            },
            insurances: [
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
                {
                    id: 12,
                    label: "AOA共済",
                    zip_code: "305-0817",
                    address1: "茨城県つくば市研究学園６－６９－１",
                    address2: "",
                    fax: "029-856-9940",
                    company_name: "AOA保険株式会社",
                    service_center: "AOAサービスセンター",
                },
            ],
            staffs: [
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
        };
    },
    methods: {
        resetForm() {},
        okform() {
            this.$router.push("/project/list");
            this.$store.dispatch("snackbar/setMessage", "案件を登録しました。");
            this.$store.dispatch("snackbar/snackOn");
        },
        get_lawyers() {
            let lawyers = [];
            for (let i = 0; i < this.staffs.length; i++) {
                if (this.staffs[i].is_lawyer) {
                    lawyers.push(
                        this.staffs[i].lastname + this.staffs[i].firstname
                    );
                }
            }
            return lawyers;
        },
        get_paralegals() {
            let paralegals = [];
            for (let i = 0; i < this.staffs.length; i++) {
                if (this.staffs[i].is_paralegal) {
                    paralegals.push(
                        this.staffs[i].lastname + this.staffs[i].firstname
                    );
                }
            }
            return paralegals;
        },
        get_insurance() {
            let insurance = [];
            for (let i = 0; i < this.insurances.length; i++) {
                insurance.push(this.insurances[i].label);
            }
            return insurance;
        },
    }
};
</script>
