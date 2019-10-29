import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    msgList: {
        groups: [
            {
                id: 1,
                type:'group',
                avatar: 'https://cdn.quasar.dev/img/avatar.png',
                name: 'test',
                text: 'fdsfs',
                msgs: [
                    {
                        name: 'whf',
                        avatar: 'https://cdn.quasar.dev/img/avatar.png',
                        text: 'fdsafjkdlsfjkdlsf',
                        sent: true,
                        time: '2019-10-15 12:21:22'
                    },
                    {
                        name: 'wwww',
                        avatar: 'https://cdn.quasar.dev/img/avatar.png',
                        text: 'fdsafjkdlsfjkdlsf',
                        sent: false,
                        time: '2019-10-15 12:21:22'
                    }
                ],
                unread: 3
            },
            {
                id: 3,
                type:'group',
                avatar: 'https://cdn.quasar.dev/img/avatar.png',
                name: 'test',
                text: 'fdsfs',
                msgs: [],
                unread: 0
            }
        ],
        users: [
            {
                id: 2,
                avatar: 'https://cdn.quasar.dev/img/avatar.png',
                name: 'test',
                text: 'fdsfs',
                unread: 3
            },
            {
                id: 4,
                avatar: 'https://cdn.quasar.dev/img/avatar.png',
                name: 'test',
                text: 'fdsfs',
                unread: 3
            }
        ]
    },
    todoList:[
        {type:'mail',level:2,title:'测试1',content:'测试测试',assign:'张三',end:'2019-12-01 12:12:12',start:'2019-11-11 11:11:11'},
        {type:'assign',level:5,title:'测试1',content:'测试测试',assign:'张三',end:'2019-12-01 12:12:12',start:'2019-11-11 11:11:11'},
        {type:'list',level:3,title:'测试2',content:'测试测试',assign:'里斯',end:'2019-12-01 12:12:12',start:'2019-11-11 11:11:11'}
    ]
}

const mutations = {
    update(session){
        if (session.type=="group"){
            this.state.msgList.groups.forEach(item,index => {
                if (item.id==session.id){
                    this.state.msgList.groups[index] = session
                }
            });
        }else{

        }
    }
}

const getters = {
    msgCount: state => {
        let g = 0
        Object.keys(state.msgList).forEach(arr => {
            state.msgList[arr].forEach(item => {
                g+= item.unread
            })
        })
        
        if (g>99){
            return '...'
        }else if (g<=0){
            return null
        }else{
            return g
        }
    }
}

export default new Vuex.Store({
    state,mutations,getters
})
