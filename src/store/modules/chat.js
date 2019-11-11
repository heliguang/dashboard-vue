const state = {
  chatMessageUpdate: false,
  user: {
    account: 'web1'
  },
  onlineUsers: [
    {
      account: 'defaultChatAccount'
    },
    {
      account: 'defaultChatAccount1'
    },
    {
      account: 'defaultChatAccount2'
    }
  ],
  chatUser: {
    account: 'defaultChatAccount1'
  },
  messages: {
    'defaultChatAccount': [
      {
        id: 'mid1',
        from: 'defaultChatAccount',
        to: 'web1',
        type: 'other',
        data: '你好呀'
      },
      {
        id: 'mid2',
        from: 'web1',
        to: 'defaultChatAccount',
        type: '聊天消息',
        data: '你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀'
      },
      {
        id: 'mid1',
        from: 'defaultChatAccount',
        to: 'web1',
        type: '图片',
        data: 'http://106.12.82.49:8888/file/echo_calibration.png'
      },
      {
        id: 'mid1',
        from: 'defaultChatAccount',
        to: 'web1',
        type: '文件',
        data: 'echo_app.apk'
      },
      {
        id: 'mid2',
        from: 'web1',
        to: 'defaultChatAccount',
        type: '图片',
        data: 'http://pic31.nipic.com/20130801/11604791_100539834000_2.jpg'
      },
      {
        id: 'mid2',
        from: 'web1',
        to: 'defaultChatAccount',
        type: '文件',
        data: 'http://pic31.nipic.com/20130801/11604791_100539834000_2.jpg'
      }
    ],
    'defaultChatAccount1': [
      {
        id: 'mid1',
        from: 'defaultChatAccount',
        to: 'web1',
        type: 'other',
        data: '你好呀'
      },
      {
        id: 'mid2',
        from: 'web1',
        to: 'defaultChatAccount',
        type: '聊天消息',
        data: '你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀'
      }
    ],
    'defaultChatAccount2': [
      {
        id: 'mid1',
        from: 'defaultChatAccount',
        to: 'web1',
        type: 'other',
        data: '你好呀'
      },
      {
        id: 'mid2',
        from: 'web1',
        to: 'defaultChatAccount',
        type: '聊天消息',
        data: '你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀你也好呀'
      },
      {
        id: 'mid1',
        from: 'defaultChatAccount',
        to: 'web1',
        type: '图片',
        data: 'http://106.12.82.49:8888/file/echo_calibration.png'
      },
      {
        id: 'mid1',
        from: 'defaultChatAccount',
        to: 'web1',
        type: '文件',
        data: 'echo_app.apk'
      },
      {
        id: 'mid2',
        from: 'web1',
        to: 'defaultChatAccount',
        type: '图片',
        data: 'http://pic31.nipic.com/20130801/11604791_100539834000_2.jpg'
      },
      {
        id: 'mid2',
        from: 'web1',
        to: 'defaultChatAccount',
        type: '文件',
        data: 'http://pic31.nipic.com/20130801/11604791_100539834000_2.jpg'
      }
    ]
  },
  unRead: {}
}

const mutations = {
  SET_CHAT_MESSAGE_UPDATE(state, update) {
    state.chatMessageUpdate = update
  },
  SET_USER(state, account) {
    state.user.account = account
  },
  SET_ONLINE_USERS(state, onlineUsers) {
    state.onlineUsers = onlineUsers
  },
  SET_CHAT_USER(state, user) {
    state.chatUser = user
  },
  PUSH_MESSAGE(state, { account, message }) {
    if (!state.messages.hasOwnProperty(account)) {
      state.messages[account] = []
    }
    state.messages[account].push(message)
  },
  INCREASE_UNREAD(state, account) {
    if (!state.unRead.hasOwnProperty(account)) {
      state.unRead[account] = 0
    }
    state.unRead[account] = state.unRead[account] + 1
  },
  SET_UNREAD(state, { account, number }) {
    state.unRead[account] = number
  }
}

const actions = {
  setUser({ commit }, account) {
    commit('SET_USER', account)
  },
  setOnlineUsers({ commit }, onlineUsers) {
    commit('SET_ONLINE_USERS', onlineUsers)
  },
  setChatUser({ commit }, user) {
    commit('SET_CHAT_USER', user)
  },
  pushMessage({ commit }, { account, message }) {
    commit('PUSH_MESSAGE', account, message)
  },
  increaseUnRead({ commit }, account) {
    commit('INCREASE_UNREAD', account)
  },
  setUnRead({ commit }, { account, number }) {
    commit('SET_UNREAD', account, number)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

