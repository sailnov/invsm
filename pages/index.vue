<template>
    <v-app
        ><v-alert text color="info">
            <h3 class="text-h5">
                お知らせ
            </h3>
            <p class="text-body-1">
                ・このウェブサイトはサンプルの為に作成されています。そのため、全ての計算・記録は不正確であり、一切記録されません。
            </p>
            <p class="text-body-1">
                ・表示されているすべての情報は架空の物であり、現実の個人・企業等とは一切関係ありません。
            </p>

            <v-divider class="my-4 info" style="opacity: 0.22;"></v-divider>

            <v-row align="center" no-gutters>
                <v-col class="grow">
                    <p class="text-body-1">
                        ・デザイン、機能等は全てサンプルというか、仮の物ですので、気になる点などございましたらお気軽にご連絡ください。
                    </p>
                    <p class="text-body-1">
                        ・本番環境では、<code>保険会社管理＞保険会社一覧</code>で使用できる、クリックして編集のやつを案件の詳細画面で使用しようと考えていますが
                        手が回らず、そこまで実装できていません。
                    </p>
                    <p class="text-body-1">
                        ・実装できていない部分が多々あり、申し訳ございませんが、あくまでイメージとして使用して頂ければ幸いです。
                    </p>
                </v-col>
            </v-row>
        </v-alert>
    </v-app>
</template>

<script>
export default {
    name: "IndexPage",
    head() {
        return {
            title: "ホーム",
        };
    },
};
</script>
