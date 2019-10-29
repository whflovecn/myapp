import Vue from 'vue'

import './styles/quasar.styl'
import 'quasar/dist/quasar.ie.polyfills'
import lang from 'quasar/lang/zh-hans.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {
    Quasar,
    QLayout,
    QHeader,
    QDrawer,
    QFooter,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    //----我加的
    QChatMessage,
    QExpansionItem,
    QCard,
    QCardSection,
    QCardActions,
    QSeparator,
    QTabs,
    QTab,
    QRouteTab,
    QAvatar,
    QBadge,
    QDialog,
    QImg,
    QMenu,
    QToggle,
    QOptionGroup,
    QRadio,
    QInput,
    QScrollArea,
    QPopupProxy,
    QTime,QDate, QRating,
    QTooltip,
    //------指令-------
    ClosePopup,
    //-----插件-------
    AppFullscreen,
    //-----util-------
    date 
} from 'quasar'

Vue.use(Quasar, {
    config: {},
    components: {
        QLayout,
        QHeader,
        QDrawer,
        QFooter,
        QPageContainer,
        QPage,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon,
        QList,
        QItem,
        QItemSection,
        QItemLabel,
        //----我加的
        QChatMessage,
        QExpansionItem,
        QCard,
        QCardSection,
        QCardActions,
        QSeparator,
        QTabs,
        QTab,
        QRouteTab,
        QAvatar,
        QBadge,
        QDialog,
        QImg,
        QMenu,
        QToggle,
        QOptionGroup,
        QRadio,
        QInput,
        QScrollArea,
        QPopupProxy,
        QTime,QDate, QRating,
        QTooltip
    },
    directives: {
        ClosePopup
    },
    plugins: {
        QDialog,
        AppFullscreen
    },
    lang: lang
})
