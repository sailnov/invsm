(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{591:function(e,t,l){"use strict";l.r(t);l(174);var n={name:"AccountListPage",head:function(){return{title:"アカウント一覧"}},data:function(){return{items:[{id:1,lastname:"山田",firstname:"太郎",email:"taro@example.com",phone:"090-1111-1111",is_lawyer:!0,is_paralegal:!0,is_admin:!0,is_active:!0},{id:2,lastname:"山田",firstname:"次郎",email:"jiro@example.com",phone:"090-2222-2222",is_lawyer:!0,is_paralegal:!0,is_admin:!1,is_active:!0},{id:3,lastname:"山田",firstname:"三郎",email:"saburo@example.com",phone:"090-3333-3333",is_lawyer:!0,is_paralegal:!0,is_admin:!1,is_active:!0},{id:4,lastname:"山田",firstname:"四郎",email:"siro@example.com",phone:"090-4444-4444",is_lawyer:!0,is_paralegal:!0,is_admin:!1,is_active:!0},{id:5,lastname:"山田",firstname:"五郎",email:"goro@example.com",phone:"090-5555-5555",is_lawyer:!1,is_paralegal:!0,is_admin:!1,is_active:!0},{id:6,lastname:"山田",firstname:"六郎",email:"rokuro@example.com",phone:"090-6666-6666",is_lawyer:!1,is_paralegal:!0,is_admin:!1,is_active:!0}],headers:[{text:"氏",align:"center",sortable:!1,value:"lastname"},{text:"名",align:"center",sortable:!1,value:"firstname"},{text:"メールアドレス",align:"center",sortable:!1,value:"email"},{text:"電話番号",align:"center",sortable:!1,value:"phone"},{text:"弁護士アカウント",align:"center",sortable:!1,value:"is_lawyer"},{text:"担当者アカウント",align:"center",sortable:!1,value:"is_paralegal"},{text:"管理者アカウント",align:"center",sortable:!1,value:"is_admin"},{text:"ステータス",align:"center",sortable:!1,value:"is_active"},{text:"操作",align:"center",sortable:!1,value:"actions"}],deleteIndex:-1,dialogDelete:!1}},methods:{deleteItem:function(e){this.deleteIndex=this.items.indexOf(e),this.dialogDelete=!0},deleteItemConfirm:function(){this.items.splice(this.deleteIndex,1),this.dialogDelete=!1},closeDelete:function(){this.dialogDelete=!1}}},r=l(94),c=l(137),o=l.n(c),m=l(439),d=l(211),v=l(483),_=l(449),x=l(588),f=l(585),h=l(195),k=l(474),w=l(445),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("v-app",[l("v-card",{attrs:{elevation:"1"}},[l("v-card-title",[l("span",[e._v("\n                    アカウント一覧\n                ")]),e._v(" "),l("v-spacer"),e._v(" "),l("v-btn",{attrs:{color:"primary",dark:"",to:"/account/create"}},[e._v("\n                    新規登録\n                ")])],1),e._v(" "),l("v-data-table",{attrs:{dense:"",headers:e.headers,items:e.items,"item-key":"id","footer-props":{"items-per-page-text":"行/ページ:"}},scopedSlots:e._u([{key:"item.is_lawyer",fn:function(t){var n=t.item;return[l("v-simple-checkbox",{attrs:{disabled:""},model:{value:n.is_lawyer,callback:function(t){e.$set(n,"is_lawyer",t)},expression:"item.is_lawyer"}})]}},{key:"item.is_paralegal",fn:function(t){var n=t.item;return[l("v-simple-checkbox",{attrs:{disabled:""},model:{value:n.is_paralegal,callback:function(t){e.$set(n,"is_paralegal",t)},expression:"item.is_paralegal"}})]}},{key:"item.is_admin",fn:function(t){var n=t.item;return[l("v-simple-checkbox",{attrs:{disabled:""},model:{value:n.is_admin,callback:function(t){e.$set(n,"is_admin",t)},expression:"item.is_admin"}})]}},{key:"item.is_active",fn:function(t){var n=t.item;return[l("v-simple-checkbox",{attrs:{disabled:""},model:{value:n.is_active,callback:function(t){e.$set(n,"is_active",t)},expression:"item.is_active"}})]}},{key:"item.actions",fn:function(t){return[l("v-icon",{attrs:{small:""},on:{click:function(l){return e.deleteItem(t.item)}}},[e._v("\n                    mdi-delete\n                ")])]}}],null,!0)}),e._v(" "),l("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[l("v-card",{staticClass:"text-center"},[l("v-card-title",{staticClass:"text-h5"},[l("v-spacer"),e._v("\n                    確認\n                    "),l("v-spacer")],1),e._v(" "),l("v-card-text",[e._v("\n                    このデータを本当に削除しますか？\n                    "),l("span",{staticClass:"red--text d-block"},[e._v("\n                        削除すると元に戻せません。\n                    ")])]),e._v(" "),l("v-card-actions",[l("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeDelete}},[e._v("キャンセル")]),e._v(" "),l("v-spacer"),e._v(" "),l("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemConfirm}},[e._v("削除")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;o()(component,{VApp:m.a,VBtn:d.a,VCard:v.a,VCardActions:_.a,VCardText:_.b,VCardTitle:_.c,VDataTable:x.a,VDialog:f.a,VIcon:h.a,VSimpleCheckbox:k.a,VSpacer:w.a})}}]);