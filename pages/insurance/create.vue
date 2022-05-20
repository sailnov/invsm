<template>
    <v-app>
        <v-card elevation="1">
            <v-form v-model="valid">
                <v-card-title>
                    保険会社登録
                </v-card-title>
                <v-container>
                    <v-row>
                        <v-col cols="6" md="6">
                            <v-text-field
                                v-model="option_label"
                                ref="option_label"
                                placeholder="ABC保険"
                                label="選択肢ラベル"
                                required
                                dense
                                :counter="30"
                                :rules="[rules.required]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-text-field
                                v-model="zipcode"
                                ref="zipcode"
                                placeholder="1234567"
                                label="郵便番号"
                                dense
                                :counter="7"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-text-field
                                v-model="address1"
                                ref="address1"
                                placeholder="東京都新宿区新宿1-1-1"
                                label="住所１"
                                dense
                                :counter="30"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-text-field
                                v-model="address2"
                                ref="address2"
                                placeholder="ABCビル"
                                label="住所２"
                                dense
                                :counter="30"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-text-field
                                v-model="fax"
                                ref="fax"
                                placeholder="0312345678"
                                label="FAX番号"
                                dense
                                :counter="10"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-text-field
                                v-model="company_name"
                                ref="company_name"
                                placeholder="株式会社ABC保険"
                                label="会社名"
                                required
                                dense
                                :counter="30"
                                :rules="[rules.required]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-text-field
                                v-model="service_center"
                                ref="service_center"
                                placeholder="シンジュクオフィス"
                                label="サービスセンター"
                                dense
                                :counter="30"
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
            title: "保険会社登録",
        };
    },
    data() {
        return {
            valid: false,
            option_label: "",
            zipcode: "",
            address1: "",
            address2: "",
            fax: "",
            company_name: "",
            service_center: "",
            rules: {
                required: (value) => !!value || '必須項目です',
            },
        };
    },
    methods: {
        resetForm() {
            this.$refs.option_label.reset();
            this.$refs.zipcode.reset();
            this.$refs.address1.reset();
            this.$refs.address2.reset();
            this.$refs.fax.reset();
            this.$refs.company_name.reset();
            this.$refs.service_center.reset();
        },
        okform() {
            this.$router.push("/insurance/list");
            this.$store.dispatch('snackbar/setMessage', '保険会社を登録しました。')
            this.$store.dispatch('snackbar/snackOn')
        },
    },
};
</script>
