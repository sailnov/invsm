<template>
    <v-app>
        <v-container fluid class="my-0 py-0 mx-3 px-2">
            <v-tabs v-model="tab" grow>
                <v-tab href="#info">情報</v-tab>
                <v-tab href="#data_object">物損データ</v-tab>
                <v-tab href="#data_body">人身データ</v-tab>
                <v-tab href="#data_keihi">実費データ</v-tab>
                <v-tab href="#data_fee">弁護士費用</v-tab>
                <v-tab href="#output">出力</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item value="data_object" class="py-3 px-1">
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-card elevation="1" class="mb-3">
                                <v-card-title>
                                    損害詳細
                                </v-card-title>
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-center">
                                                    項目
                                                </th>
                                                <th class="text-center">
                                                    金額（円）
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-left">
                                                    時価額
                                                </td>
                                                <td class="text-right">
                                                    <span
                                                        >{{
                                                            damage_object.price_market
                                                        }}円</span
                                                    >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-left">
                                                    一次レッカー
                                                </td>
                                                <td class="text-right">
                                                    <span
                                                        >{{
                                                            damage_object.price_1thwrecker
                                                        }}円</span
                                                    >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-left">
                                                    二次レッカー
                                                </td>
                                                <td class="text-right">
                                                    <span
                                                        >{{
                                                            damage_object.price_2thwrecker
                                                        }}円</span
                                                    >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-left">
                                                    代車代
                                                </td>
                                                <td class="text-right">
                                                    <span
                                                        >{{
                                                            damage_object.price_substitutecar
                                                        }}円</span
                                                    >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-left">
                                                    評価額
                                                </td>
                                                <td class="text-right">
                                                    <span
                                                        >{{
                                                            damage_object.price_loss
                                                        }}円</span
                                                    >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-left">
                                                    買替損害額
                                                </td>
                                                <td class="text-right">
                                                    <span
                                                        >{{
                                                            damage_object.price_replacement
                                                        }}円</span
                                                    >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-left">
                                                    車載物
                                                </td>
                                                <td class="text-right">
                                                    <span
                                                        >{{
                                                            damage_object.price_invehicle
                                                        }}円</span
                                                    >
                                                </td>
                                            </tr>
                                            <tr
                                                v-for="i in damage_object.others"
                                                :key="i.title"
                                            >
                                                <td class="text-left">
                                                    {{ i.title }}
                                                </td>
                                                <td class="text-right">
                                                    <span>
                                                        {{ i.price }}円</span
                                                    >
                                                </td>
                                            </tr>
                                            <tr
                                                class="border-top green lighten-4"
                                            >
                                                <td
                                                    class="text-ceter font-weight-bold"
                                                >
                                                    合計損害額
                                                </td>
                                                <td class="text-right">
                                                    <span
                                                        >{{
                                                            get_damage_total()
                                                        }}円</span
                                                    >
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-card elevation="1" class="mb-3">
                                <v-card-title>
                                    過失計算
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field
                                                label="過失割合(%)"
                                                required
                                                id="deduct_percent"
                                                value="10"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field
                                                label="過失分額(円)"
                                                required
                                                readonly
                                                id="deduct_price"
                                                value="520900"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            <v-card elevation="1" class="mb-3">
                                <v-card-title>
                                    既払い詳細
                                </v-card-title>
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-center">
                                                    項目
                                                </th>
                                                <th class="text-center">
                                                    金額（円）
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="i in paid_object"
                                                :key="i.title"
                                            >
                                                <td class="text-left">
                                                    {{ i.title }}
                                                </td>
                                                <td class="text-right">
                                                    <span>
                                                        {{ i.price }}円</span
                                                    >
                                                </td>
                                            </tr>
                                            <tr
                                                class="border-top green lighten-4"
                                            >
                                                <td
                                                    class="text-ceter font-weight-bold"
                                                >
                                                    合計既払い
                                                </td>
                                                <td class="text-right">
                                                    <span
                                                        >{{
                                                            get_paid_total()
                                                        }}円</span
                                                    >
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-card elevation="1" class="mb-3">
                                <v-card-title>
                                    結果
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="損害合計額"
                                                readonly
                                                value="5209000"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="過失分控除後"
                                                readonly
                                                value="4688100"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="既払い控除後"
                                                readonly
                                                value="4672100"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="最終損害額"
                                                readonly
                                                value="4672100"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item value="data_body" class="py-3 px-1">
                    <v-card class="py-0 mb-3">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="4" lg="2">
                                    <v-list two-line>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    2022/04/01
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    事故発生日
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                                <v-col cols="12" md="4" lg="2">
                                    <v-list two-line>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    2022/06/24（+85日）
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    一括終了日
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                                <v-col cols="12" md="4" lg="2">
                                    <v-list two-line>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    2022/09/01（+154日）
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    症状固定日
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                                <v-col cols="12" md="4" lg="2">
                                    <v-list two-line>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    1985/08/10
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    生年月日
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                                <v-col cols="12" md="4" lg="2">
                                    <v-list two-line>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    男性
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    性別
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                                <v-col cols="12" md="4" lg="2">
                                    <v-list two-line>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    37歳
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    症状固定日時点の年齢
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card class="mb-3">
                        <v-card-title>
                            治療費及び入通院日数
                        </v-card-title>
                        <v-tabs v-model="tuhnyuh" grow>
                            <v-tab href="#tuh">
                                通院
                            </v-tab>
                            <v-tab href="#nyuh">入院</v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tuhnyuh">
                            <v-tab-item value="tuh" class="py-3 px-1">
                                <v-simple-table height="300px" dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left" width="50px">
                                                </th>
                                                <th class="text-center" colspan="2">
                                                    Aクリニック
                                                </th>
                                                <th class="text-center" colspan="2">
                                                    Bクリニック
                                                </th>
                                                <th class="text-center" colspan="2">
                                                    Cクリニック
                                                </th>
                                                <th class="text-center" colspan="2">
                                                    Dクリニック
                                                </th>
                                                <th class="text-center" colspan="2">
                                                    Eクリニック
                                                </th>
                                            </tr>
                                            <tr>
                                                <th class="text-left" width="50px">
                                                    #
                                                </th>
                                                <th class="text-center">
                                                    治療費
                                                </th>
                                                <th class="text-center">
                                                    日数
                                                </th>
                                                <th class="text-center">
                                                    治療費
                                                </th>
                                                <th class="text-center">
                                                    日数
                                                </th>
                                                <th class="text-center">
                                                    治療費
                                                </th>
                                                <th class="text-center">
                                                    日数
                                                </th>
                                                <th class="text-center">
                                                    治療費
                                                </th>
                                                <th class="text-center">
                                                    日数
                                                </th>
                                                <th class="text-center">
                                                    治療費
                                                </th>
                                                <th class="text-center">
                                                    日数
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-center">
                                            <tr>
                                                <td>2022/04</td>
                                                <td>10000</td>
                                                <td>22</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>2022/05</td>
                                                <td>10000</td>
                                                <td>22</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>2022/06</td>
                                                <td>10000</td>
                                                <td>22</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>2022/07</td>
                                                <td>10000</td>
                                                <td>22</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>2022/08</td>
                                                <td>10000</td>
                                                <td>22</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-tab-item>
                            <v-tab-item value="nyuh" class="py-3 px-1">
                                <v-simple-table height="300px" dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left" width="50px">
                                                </th>
                                                <th class="text-center" colspan="2">
                                                    Aクリニック
                                                </th>
                                                <th class="text-center" colspan="2">
                                                    Bクリニック
                                                </th>
                                                <th class="text-center" colspan="2">
                                                    Cクリニック
                                                </th>
                                                <th class="text-center" colspan="2">
                                                    Dクリニック
                                                </th>
                                                <th class="text-center" colspan="2">
                                                    Eクリニック
                                                </th>
                                            </tr>
                                            <tr>
                                                <th class="text-left" width="50px">
                                                    #
                                                </th>
                                                <th class="text-center">
                                                    治療費
                                                </th>
                                                <th class="text-center">
                                                    日数
                                                </th>
                                                <th class="text-center">
                                                    治療費
                                                </th>
                                                <th class="text-center">
                                                    日数
                                                </th>
                                                <th class="text-center">
                                                    治療費
                                                </th>
                                                <th class="text-center">
                                                    日数
                                                </th>
                                                <th class="text-center">
                                                    治療費
                                                </th>
                                                <th class="text-center">
                                                    日数
                                                </th>
                                                <th class="text-center">
                                                    治療費
                                                </th>
                                                <th class="text-center">
                                                    日数
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-center">
                                            <tr>
                                                <td>2022/04</td>
                                                <td>100000</td>
                                                <td>22</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>2022/05</td>
                                                <td>100000</td>
                                                <td>22</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>2022/06</td>
                                                <td>100000</td>
                                                <td>22</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>2022/07</td>
                                                <td>100000</td>
                                                <td>22</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>2022/08</td>
                                                <td>100000</td>
                                                <td>22</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-tab-item>
                        </v-tabs-items>
                        <v-card-action class="d-flex justify-content-between w-100">
                            <v-list two-line>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            50000
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            通院治療費合計
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-list two-line>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            110
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            通院日数合計
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-list two-line>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            500000
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            入院治療費合計
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-list two-line>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            110
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            入院日数合計
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-list two-line>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            165000
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            入院雑費（日数*1500）
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-action>
                    </v-card>
                </v-tab-item>
                <v-tab-item value="data_keihi" class="py-3 px-1">
                    実費計算タブ（デザインは割愛）
                </v-tab-item>
                <v-tab-item value="data_fee" class="py-3 px-1">
                    弁護士費用計算タブ（デザインは割愛）
                </v-tab-item>
                <v-tab-item value="info" class="py-3 px-1">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-card elevation="1" class="mb-3">
                                <v-card-title>
                                    基本情報
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{ project_detail.lawyer_name }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                担当弁護士
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{
                                                    project_detail.paralegal_name
                                                }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                弊所担当者
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{ project_detail.incident_at }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                事故発生日
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{
                                                    project_detail.counseling_at
                                                }}
                                                {{
                                                    project_detail.counseling_start_time
                                                }}~{{
                                                    project_detail.counseling_end_time
                                                }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                相談日時
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            <v-card elevation="1" class="mb-3">
                                <v-card-title>
                                    依頼人情報
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{ project_detail.client_name }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                依頼人氏名
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{
                                                    project_detail.client_birthday
                                                }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                依頼人生年月日
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{
                                                    project_detail.client_insurance
                                                }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                依頼人弁特保険会社
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{
                                                    project_detail.client_manager
                                                }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                弁特保険担当者
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{ project_detail.client_tel }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                依頼人電話番号
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                〒{{
                                                    project_detail.client_zipcode
                                                }}<br />
                                                {{
                                                    project_detail.client_address
                                                }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                依頼人発送先
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            <v-card elevation="1" class="mb-3">
                                <v-card-title>
                                    相手方情報
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{ project_detail.other_name }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                相手方氏名
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{
                                                    project_detail.other_insurance
                                                }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                相手方保険会社
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{
                                                    project_detail.other_body_manager
                                                }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                相手方人身担当者
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{
                                                    project_detail.other_object_manager
                                                }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                相手方物損担当者
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{
                                                    project_detail.other_liability
                                                }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                相手方自賠責
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-card elevation="1">
                                <v-card-title>
                                    発送先等
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                                height="100"
                                            >
                                                {{
                                                    get_insurance(
                                                        project_detail.client_insurance
                                                    ).company_name
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.client_insurance
                                                    ).service_center
                                                }}<br />
                                                {{
                                                    project_detail.client_manager
                                                        ? project_detail.client_manager +
                                                          " 様"
                                                        : "ご担当者 様"
                                                }}<br />
                                                FAX:
                                                {{
                                                    get_insurance(
                                                        project_detail.client_insurance
                                                    ).fax
                                                }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                弁特保険担当者FAX送信先
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                〒{{
                                                    get_insurance(
                                                        project_detail.client_insurance
                                                    ).zip_code
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.client_insurance
                                                    ).address1
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.client_insurance
                                                    ).address2
                                                }}<br
                                                    v-if="
                                                        get_insurance(
                                                            project_detail.other_insurance
                                                        ).address2
                                                    "
                                                />
                                                {{
                                                    get_insurance(
                                                        project_detail.client_insurance
                                                    ).company_name
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.client_insurance
                                                    ).service_center
                                                }}<br />
                                                {{
                                                    project_detail.client_manager
                                                        ? project_detail.client_manager +
                                                          " 様"
                                                        : "ご担当者 様"
                                                }}<br />
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary align-end"
                                            >
                                                弁特保険担当者郵送先
                                            </p>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).company_name
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).service_center
                                                }}<br />
                                                {{
                                                    project_detail.other_body_manager
                                                        ? project_detail.other_body_manager +
                                                          " 様"
                                                        : "ご担当者 様"
                                                }}<br />
                                                FAX:
                                                {{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).fax
                                                }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                相手方<b>人身</b>担当者FAX送信先
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                〒{{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).zip_code
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).address1
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).address2
                                                }}<br
                                                    v-if="
                                                        get_insurance(
                                                            project_detail.other_insurance
                                                        ).address2
                                                    "
                                                />
                                                {{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).company_name
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).service_center
                                                }}<br />
                                                {{
                                                    project_detail.other_body_manager
                                                        ? project_detail.other_body_manager +
                                                          " 様"
                                                        : "ご担当者 様"
                                                }}<br />
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                相手方<b>人身</b>担当者郵送先
                                            </p>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                {{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).company_name
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).service_center
                                                }}<br />
                                                {{
                                                    project_detail.other_object_manager
                                                        ? project_detail.other_object_manager +
                                                          " 様"
                                                        : "ご担当者 様"
                                                }}<br />
                                                FAX:
                                                {{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).fax
                                                }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                相手方<b>物損</b>担当者FAX送信先
                                            </p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                〒{{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).zip_code
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).address1
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).address2
                                                }}<br
                                                    v-if="
                                                        get_insurance(
                                                            project_detail.other_insurance
                                                        ).address2
                                                    "
                                                />
                                                {{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).company_name
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.other_insurance
                                                    ).service_center
                                                }}<br />
                                                {{
                                                    project_detail.other_object_manager
                                                        ? project_detail.other_object_manager +
                                                          " 様"
                                                        : "ご担当者 様"
                                                }}<br />
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                相手方<b>物損</b>担当者郵送先
                                            </p>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <p
                                                class="my-0 text-body-2 text--primary"
                                            >
                                                〒{{
                                                    get_insurance(
                                                        project_detail.other_liability
                                                    ).zip_code
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.other_liability
                                                    ).address1
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.other_liability
                                                    ).address2
                                                }}<br
                                                    v-if="
                                                        get_insurance(
                                                            project_detail.other_liability
                                                        ).address2
                                                    "
                                                />
                                                {{
                                                    get_insurance(
                                                        project_detail.other_liability
                                                    ).company_name
                                                }}<br />
                                                {{
                                                    get_insurance(
                                                        project_detail.other_liability
                                                    ).service_center
                                                }}
                                            </p>
                                            <p
                                                class="my-0 text-caption text--secondary"
                                            >
                                                相手方自賠責郵送先
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item value="output">
                    <v-card elevation="0">
                        <v-card-title>
                            基本書類
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        FAX送信状
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        委任状・委任契約書
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        受任通知
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="0">
                        <v-card-title>
                            物損請求
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        物損請求書（全損）
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        物損請求書（分損）
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        作成依頼書
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        〇〇請求書
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        〇〇請求書
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        〇〇請求書
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        〇〇請求書
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        〇〇請求書
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="0">
                        <v-card-title>
                            人身請求
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        請求書
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        作成依頼書
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        〇〇請求書
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        〇〇請求書
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        〇〇請求書
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        〇〇請求書
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn block>
                                        〇〇請求書
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: "ProjectDetailIndexPage",
    head() {
        return {
            title: "",
        };
    },
    data() {
        return {
            tab: null,
            tuhnyuh: null,
            project_detail: {
                id: 1,
                lawyer_name: "山田太郎",
                paralegal_name: "鈴木次郎",
                incident_at: "2020/01/01",
                counseling_at: "2020/01/15",
                counseling_start_time: "10:00",
                counseling_end_time: "19:00",
                client_name: "山田三郎",
                client_zipcode: "1234567",
                client_address: "東京都港区芝浦１丁目１−１",
                client_tel: "03-1234-5678",
                client_birthday: "1990/01/01",
                client_insurance: "ABC保険",
                client_manager: "山田史郎",
                other_name: "山田五郎",
                other_insurance: "DEF保険",
                other_body_manager: "山田六郎",
                other_object_manager: "山田七郎",
                other_liability: "AOA共済",
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
            damage_object: {
                price_market: "5000000",
                price_1thwrecker: "50000",
                price_2thwrecker: "50000",
                price_substitutecar: "80000",
                price_loss: "3000",
                price_replacement: "10000",
                price_invehicle: "10000",
                others: [
                    {
                        title: "なんとか代",
                        price: "1000",
                    },
                    {
                        title: "なんとか代2",
                        price: "2000",
                    },
                    {
                        title: "なんとか代3",
                        price: "3000",
                    },
                ],
            },
            paid_object: [
                {
                    title: "車載額",
                    price: "3000",
                },
                {
                    title: "買い替え損害額",
                    price: "10000",
                },
                {
                    title: "なんとか代3",
                    price: "3000",
                },
            ],
        };
    },
    methods: {
        get_insurance(name) {
            for (let i = 0; i < this.insurances.length; i++) {
                if (this.insurances[i].label === name) {
                    return this.insurances[i];
                }
            }
            return "";
        },
        get_damage_total() {
            let total = 0;
            for (let i = 0; i < this.damage_object.others.length; i++) {
                total += parseInt(this.damage_object.others[i].price);
            }
            total += parseInt(this.damage_object.price_market);
            total += parseInt(this.damage_object.price_1thwrecker);
            total += parseInt(this.damage_object.price_2thwrecker);
            total += parseInt(this.damage_object.price_substitutecar);
            total += parseInt(this.damage_object.price_loss);
            total += parseInt(this.damage_object.price_replacement);
            total += parseInt(this.damage_object.price_invehicle);
            return total;
        },
        get_paid_total() {
            let total = 0;
            for (let i = 0; i < this.paid_object.length; i++) {
                total += parseInt(this.paid_object[i].price);
            }
            return total;
        },
    },
};
</script>
