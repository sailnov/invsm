<template>
    <v-app>
        <v-card elevation="1">
            <v-form v-model="valid">
                <v-card-title>
                    アカウント登録
                </v-card-title>
                <v-container>
                    <v-row>
                        <v-col cols="6" md="6">
                            <v-text-field
                                v-model="lastname"
                                ref="lastname"
                                placeholder="山田"
                                :rules="nameRules"
                                :counter="10"
                                label="氏"
                                required
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-text-field
                                v-model="firstname"
                                ref="firstname"
                                placeholder="太郎"
                                :rules="nameRules"
                                :counter="10"
                                label="名"
                                required
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="email"
                                ref="email"
                                placeholder="mail@example.com"
                                :rules="emailRules"
                                label="メールアドレス"
                                required
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="phone"
                                ref="phone"
                                placeholder="09011111111"
                                :rules="phoneRules"
                                label="電話番号"
                                required
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-checkbox
                                v-model="is_lawyer"
                                :label="
                                    is_lawyer
                                        ? '弁護士アカウントです'
                                        : '弁護士ではありません'
                                "
                                messages="弁護士の選択肢に表示するかどうか"
                                ref="is_lawyer"
                            ></v-checkbox>
                            <v-checkbox
                                v-model="is_admin"
                                :label="
                                    is_admin
                                        ? '管理者アカウントです'
                                        : '管理者ではありません'
                                "
                                messages="重要情報の作成・編集・削除など、システムの管理者権限を与えるかどうか"
                                ref="is_admin"
                            ></v-checkbox>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-checkbox
                                v-model="is_paralegal"
                                :label="
                                    is_paralegal
                                        ? '担当者アカウントです'
                                        : '担当者ではありません'
                                "
                                messages="担当者の選択肢に表示するかどうか"
                                ref="is_paralegal"
                            ></v-checkbox>
                            <v-checkbox
                                v-model="is_active"
                                :label="
                                    is_active
                                        ? '有効なアカウントです'
                                        : '無効なアカウントです'
                                "
                                messages="有効だと使用可能、無効だと使用不可"
                                ref="is_active"
                            ></v-checkbox>
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
    name: "AccountAddPage",
    head() {
        return {
            title: "アカウント登録",
        };
    },
    data() {
        return {
            valid: false,
            lastname: "",
            firstname: "",
            email: "",
            phone: "",
            is_lawyer: false,
            is_paralegal: false,
            is_admin: false,
            is_active: false,
            nameRules: [
                (v) => !!v || "名前を入力してください",
                (v) => (v && v.length <= 10) || "10文字以内で入力してください",
            ],
            emailRules: [
                (v) => !!v || "メールアドレスを入力してください",
                (v) =>
                    /.+@.+/.test(v) || "メールアドレスを正しく入力してください",
            ],
            phoneRules: [
                (v) => !!v || "電話番号を入力してください",
                (v) =>
                    /^0[0-9]{9,10}$/.test(v) ||
                    "電話番号を正しく入力してください",
            ],
        };
    },
    methods: {
        resetForm() {
            this.$refs.lastname.reset();
            this.$refs.firstname.reset();
            this.$refs.email.reset();
            this.$refs.phone.reset();
            this.$refs.is_lawyer.reset();
            this.$refs.is_paralegal.reset();
            this.$refs.is_admin.reset();
            this.$refs.is_active.reset();
        },
        okform() {
            this.$router.push("/account/list");
            this.$store.dispatch('snackbar/setMessage', 'アカウントを登録しました。')
            this.$store.dispatch('snackbar/snackOn')
        },
    },
};
</script>
