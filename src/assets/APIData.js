let data = {
  accounts: {
    open: {
      name: "本地不加密直接登陆（不推荐使用）",
      uri: "/api/accounts/open",
      method: "post",
      remark: "",
      req: [
        {
          name: "secret",
          type: "string",
          isRequired: true,
          desc: "账户密码"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "account",
          type: "json",
          desc: "账户信息"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    open2: {
      name: "本地加密后再登陆（推荐使用）",
      uri: "/api/accounts/open2",
      method: "post",
      remark: "公钥需要根据用户提供的密码在在本地用程序生成",
      req: [
        {
          name: "publicKey",
          type: "string",
          isRequired: true,
          desc: "账户公钥"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "account",
          type: "json",
          desc: "账户信息"
        },
        {
          name: "latestBlock",
          type: "json",
          desc: "最后一个区块信息"
        },
        {
          name: "version",
          type: "json",
          desc: "版本信息"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getAccount: {
      name: "获取账户信息",
      uri: "/api/accounts",
      method: "get",
      remark: "",
      req: [
        {
          name: "address",
          type: "string",
          isRequired: true,
          desc: "用户地址,最小长度：1"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "account",
          type: "json",
          desc: "账户信息"
        },
        {
          name: "latestBlock",
          type: "json",
          desc: "最后一个区块信息"
        },
        {
          name: "version",
          type: "json",
          desc: "版本信息"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getBalance: {
      name: "获取账户余额",
      uri: "/api/accounts/getBalance",
      method: "get",
      remark: "",
      req: [
        {
          name: "address",
          type: "string",
          isRequired: true,
          desc: "用户地址,最小长度：1"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "balance",
          type: "integer",
          desc: "余额"
        },
        {
          name: "unconfirmedBalance",
          type: "integer",
          desc: "未确认和已确认的余额之和，该值大于等于balance"
        },
        {
          name: "delayAmount",
          type: "integer",
          desc: "延迟到账总金额"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getPublickey: {
      name: "获取账户公钥",
      uri: "/api/accounts/getPublickey",
      method: "get",
      remark: "账户给别人转过账才会有公钥",
      req: [
        {
          name: "address",
          type: "string",
          isRequired: true,
          desc: "用户地址,最小长度：1"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "publicKey",
          type: "string",
          desc: "公钥"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    generatePublickey: {
      name: "生成公钥",
      uri: "/api/accounts/generatePublickey",
      method: "post",
      remark: "",
      req: [
        {
          name: "secret",
          type: "string",
          isRequired: true,
          desc: "账户密码"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "publicKey",
          type: "string",
          desc: "公钥"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    delegates: {
      name: "根据地址获取其投票列表",
      uri: "/api/accounts/delegates",
      method: "get",
      remark: "",
      req: [
        {
          name: "address",
          type: "string",
          isRequired: true,
          desc: "投票人地址"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "delegates",
          type: "Array",
          desc: "已投票的受托人详情数组"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    delegateFee: {
      name: "获取投票手续费",
      uri: "/api/accounts/delegates/fee",
      method: "get",
      remark: "",
      req: [],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "fee",
          type: "integer",
          desc: "手续费"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    vote: {
      name: "创建投票",
      uri: "/api/accounts/delegates",
      method: "put",
      remark: "",
      req: [
        {
          name: "secret",
          type: "string",
          isRequired: true,
          desc: "账户密码"
        },
        {
          name: "publicKey",
          type: "string",
          isRequired: false,
          desc: "公钥"
        },
        {
          name: "secondSecret",
          type: "string",
          isRequired: false,
          desc: "账户二级密码，最小长度：1，最大长度：100"
        },
        {
          name: "delegates",
          type: "Array",
          isRequired: true,
          desc:
            "受托人公钥数组，每个公钥前需要加上+或者-号，代表增加/取消对其的投票"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "",
          type: "",
          desc: ""
        }
      ],
      reqExample: {},
      resExample: {}
    },
    top: {
      name: "获取账户排行榜前100名",
      uri: "/api/accounts/top",
      method: "get",
      remark: "如果不加请求参数则返回持币量前100名账户信息",
      req: [
        {
          name: "limit",
          type: "integer",
          isRequired: false,
          desc: "限制结果集个数，最小值：0,最大值：100"
        },
        {
          name: "offset",
          type: "integer",
          isRequired: false,
          desc: "步长，最小值0"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "accounts",
          type: "Array",
          desc: "账户信息元组，每个元素包含地址、余额、公钥"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    delayOrders: {
      name: "查询延迟到账列表",
      uri: "/api/accounts/delayOrders",
      method: "get",
      remark: "",
      req: [
        {
          name: "address",
          type: "string",
          isRequired: true,
          desc: "查询的地址"
        },
        {
          name: "mode",
          type: "integer",
          isRequired: true,
          desc: "查询类别,0-代表指定的地址为接收者，1-代表指定的地址为发送者"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "result",
          type: "Array",
          desc: "查询结果，包括发送者、接受者、金额、到账高度"
        },
        {
          name: "latestHeight",
          type: "integer",
          desc: "最后高度"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    effectivity: {
      name: "账户是否在链上",
      uri: "/api/accounts/effectivity",
      method: "get",
      remark: "",
      req: [
        {
          name: "address",
          type: "string",
          isRequired: true,
          desc: "账户地址"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "effectivity",
          type: "bool",
          desc: "账户是否在链上"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    new: {
      name: "新建账号",
      uri: "/api/accounts/new",
      method: "get",
      remark: "",
      req: [],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "secret",
          type: "string",
          desc: "账户密码"
        },
        {
          name: "publicKey",
          type: "string",
          desc: "公钥"
        },
        {
          name: "privateKey",
          type: "string",
          desc: "私钥"
        },
        {
          name: "address",
          type: "string",
          desc: "地址"
        }
      ],
      reqExample: {},
      resExample: {}
    }
  },
  transactions: {
    getTransaction: {
      name: "获取交易信息",
      uri: "/api/transactions",
      method: "get",
      remark: "如果请求不加参数则会获取全网所有交易",
      req: [
        {
          name: "blockId",
          type: "string",
          isRequired: false,
          desc: "区块id"
        },
        {
          name: "type",
          type: "integer",
          isRequired: false,
          desc: "交易类型"
        },
        {
          name: "limit",
          type: "integer",
          isRequired: false,
          desc: "限制结果集个数，最小值：0,最大值：100"
        },
        {
          name: "offset",
          type: "integer",
          isRequired: false,
          desc: "步长，最小值0"
        },
        {
          name: "orderBy",
          type: "string",
          isRequired: false,
          desc: "根据表中字段排序"
        },
        {
          name: "senderPublicKey",
          type: "string",
          isRequired: false,
          desc: "发送者公钥"
        },
        {
          name: "ownerPublicKey",
          type: "string",
          isRequired: false,
          desc: ""
        },
        {
          name: "ownerAddress",
          type: "string",
          isRequired: false,
          desc: ""
        },
        {
          name: "senderId",
          type: "string",
          isRequired: false,
          desc: "发送者地址"
        },
        {
          name: "recipientId",
          type: "string",
          isRequired: false,
          desc: "接收者地址,最小长度：1"
        },
        {
          name: "amount",
          type: "integer",
          isRequired: false,
          desc: "金额"
        },
        {
          name: "fee",
          type: "integer",
          isRequired: false,
          desc: "手续费"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transactions",
          type: "json",
          desc: "账户信息元组，每个元素包含地址、余额、公钥"
        },
        {
          name: "count",
          type: "integer",
          desc: "满足条件的交易个数，因为transactions最大只会回传101个"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getTransactionById: {
      name: "根据id查看交易详情",
      uri: "/api/transactions/get",
      method: "get",
      remark: "",
      req: [
        {
          name: "id",
          type: "string",
          isRequired: true,
          desc: "交易id"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transaction",
          type: "json",
          desc: "交易详情"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getUnconfirmed: {
      name: "获取未确认的交易详情",
      uri: "/api/transactions/unconfirmed",
      method: "get",
      remark: "如果不加参数，则会获取全网所有未确认交易",
      req: [
        {
          name: "senderPublicKey",
          type: "string",
          isRequired: false,
          desc: "发送者公钥"
        },
        {
          name: "address",
          type: "string",
          isRequired: false,
          desc: "地址"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transactions",
          type: "Array",
          desc: "未确认交易列表"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getUncomfirmedById: {
      name: "根据未确认交易id查看详情",
      uri: "/api/transactions/unconfirmed/get",
      method: "get",
      remark: "",
      req: [
        {
          name: "id",
          type: "string",
          isRequired: true,
          desc: "未确认交易id"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transaction",
          type: "json",
          desc: "交易详情"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    createTransaction: {
      name: "创建交易",
      uri: "/api/transactions",
      method: "put",
      remark: "",
      req: [
        {
          name: "secret",
          type: "string",
          isRequired: true,
          desc: "账户密码"
        },
        {
          name: "amount",
          type: "integer",
          isRequired: true,
          desc: "金额，最小值：1，最大值：10000000000000000"
        },
        {
          name: "recipientId",
          type: "string",
          isRequired: true,
          desc: "接收者地址,最小长度：1"
        },
        {
          name: "publicKey",
          type: "string",
          isRequired: false,
          desc: "发送者公钥"
        },
        {
          name: "secondSecret",
          type: "string",
          isRequired: false,
          desc: "发送者二级密码，最小长度1，最大长度：100"
        },
        {
          name: "multisigAccountPublicKey",
          type: "string",
          isRequired: false,
          desc: "多重签名账户公钥"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transactionId",
          type: "string",
          desc: "交易id"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    delay: {
      name: "延迟到账交易",
      uri: "/api/transactions/delay",
      method: "put",
      remark: "",
      req: [
        {
          name: "secret",
          type: "string",
          isRequired: true,
          desc: "账号secret值"
        },
        {
          name: "amount",
          type: "integer",
          isRequired: true,
          desc: "延迟到账金额"
        },
        {
          name: "recipientId",
          type: "string",
          isRequired: true,
          desc: "接收者地址"
        },
        {
          name: "publicKey",
          type: "string",
          isRequired: false,
          desc: "发送者公钥"
        },
        {
          name: "secondSecret",
          type: "string",
          isRequired: false,
          desc: "发送者二级密码，如果设置了，则此项为必填项"
        },
        {
          name: "multisigAccountPulicKey",
          type: "string",
          isRequired: false,
          desc: "多重签名账号公钥"
        },
        {
          name: "message",
          type: "string",
          isRequired: false,
          desc: "附加消息"
        },
        {
          name: "args",
          type: "array",
          isRequired: false,
          desc: "延迟时间参数，数组元素个数为1，表示指定的到账日期时间(UTC)"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transactionId",
          type: "string",
          desc: "交易id"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    signed: {
      name: "已签名交易",
      uri: "/api/transactions/signed",
      method: "put",
      remark: "",
      req: [
        {
          name: "transactions",
          type: "array",
          isRequired: true,
          desc: "已签名的交易数组"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transactions",
          type: "array",
          desc: "所有交易"
        }
      ],
      reqExample: {},
      resExample: {}
    }
  },
  blocks: {
    getBlock: {
      name: "获取特定区块详情",
      uri: "/api/blocks/get",
      method: "get",
      remark: "",
      req: [
        {
          name: "id",
          type: "string",
          isRequired: false,
          desc: "区块id(参数2选1)"
        },
        {
          name: "height",
          type: "string",
          isRequired: false,
          desc: "区块高度(参数2选1)"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "block",
          type: "json",
          desc: "区块详情"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getBlockByField: {
      name: "查询符合条件的区块",
      uri: "/api/blocks",
      method: "get",
      remark: "不加参数则获取全网区块详情",
      req: [
        {
          name: "limit",
          type: "integer",
          isRequired: false,
          desc: "限制结果集个数，最小值：0,最大值：100"
        },
        {
          name: "orderBy",
          type: "string",
          isRequired: false,
          desc: "根据表中字段排序，如height:desc"
        },
        {
          name: "offset",
          type: "integer",
          isRequired: false,
          desc: "步长，最小值0"
        },
        {
          name: "generatorPublicKey",
          type: "string",
          isRequired: false,
          desc: "区块生成者公钥"
        },
        {
          name: "totalAmount",
          type: "integer",
          isRequired: false,
          desc: "交易总额，最小值：0，最大值：10000000000000000"
        },
        {
          name: "totalFee",
          type: "integer",
          isRequired: false,
          desc: "手续费总额，最小值：0，最大值：10000000000000000"
        },
        {
          name: "reward",
          type: "integer",
          isRequired: false,
          desc: "奖励金额，最小值：0"
        },
        {
          name: "previousBlock",
          type: "string",
          isRequired: false,
          desc: "上一个区块"
        },
        {
          name: "height",
          type: "integer",
          isRequired: false,
          desc: "区块高度"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "blocks",
          type: "Array",
          desc: "由区块详情json串构成的数组"
        },
        {
          name: "count",
          type: "integer",
          desc: "获取数量"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getHeight: {
      name: "获取区块链高度",
      uri: "/api/blocks/getHeight",
      method: "get",
      remark: "",
      req: [],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "height",
          type: "integer",
          desc: "区块链高度"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getFee: {
      name: "获取交易手续费",
      uri: "/api/blocks/getFee",
      method: "get",
      remark: "",
      req: [],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "fee",
          type: "integer",
          desc: "交易手续费"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getMilestone: {
      name: "获取里程碑",
      uri: "/api/blocks/getMilestone",
      method: "get",
      remark: "",
      req: [],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "milestone",
          type: "integer",
          desc: "里程碑阶段"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getReward: {
      name: "查看单个区块奖励",
      uri: "/api/blocks/getReward",
      method: "get",
      remark: "",
      req: [],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "reward",
          type: "integer",
          desc: "区块奖励"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getSupply: {
      name: "获取区块链当前最大供应值",
      uri: "/api/blocks/getSupply",
      method: "get",
      remark: "",
      req: [],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "supply",
          type: "integer",
          desc: "全网ETM个数"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getStatus: {
      name: "区块链状态",
      uri: "/api/blocks/getStatus",
      method: "get",
      remark: "",
      req: [],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "height",
          type: "integer",
          desc: "区块链高度"
        },
        {
          name: "fee",
          type: "integer",
          desc: "交易手续费"
        },
        {
          name: "milestone",
          type: "integer",
          desc: "区块链里程碑"
        },
        {
          name: "reward",
          type: "integer",
          desc: "区块奖励"
        },
        {
          name: "supply",
          type: "integer",
          desc: "全网ETM个数"
        }
      ],
      reqExample: {},
      resExample: {}
    }
  },
  delegates: {
    count: {
      name: "获取受托人总个数",
      uri: "/api/delegates/count",
      method: "get",
      remark: "",
      req: [],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "count",
          type: "integer",
          desc: "受托人总个数"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    voters: {
      name: "查看受托人投票者",
      uri: "/api/delegates/voters",
      method: "get",
      remark: "",
      req: [
        {
          name: "publicKey",
          type: "string",
          isRequired: true,
          desc: "受托人公钥"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "accounts",
          type: "Array",
          desc: "账户json串组成的数组"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getDelegate: {
      name: "根据公钥或者用户名获取受托人详情",
      uri: "/api/delegates/get",
      method: "get",
      remark: "",
      req: [
        {
          name: "publicKey",
          type: "string",
          isRequired: false,
          desc: "受托人公钥(参数二选一)"
        },
        {
          name: "username",
          type: "string",
          isRequired: false,
          desc: "受托人用户名(参数二选一)"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "delegate",
          type: "json",
          desc: "委托人详情"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getAllDelegates: {
      name: "获取受托人列表",
      uri: "/api/delegates",
      method: "get",
      remark: "如果不加参数则会返回全网受托人列表",
      req: [
        {
          name: "address",
          type: "string",
          isRequired: false,
          desc: "受托人地址"
        },
        {
          name: "limit",
          type: "integer",
          isRequired: false,
          desc: "限制返回结果数据集的个数"
        },
        {
          name: "offset",
          type: "integer",
          isRequired: false,
          desc: "步长，最小值：0"
        },
        {
          name: "orderBy",
          type: "string",
          isRequired: false,
          desc: "排序字段:排序规则，如:desc"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "delegates",
          type: "Array",
          desc: "受托人详情列表"
        },
        {
          name: "totalCount",
          type: "integer",
          desc: "受托人总数量"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    delegateFee: {
      name: "获取受托人设置的转账费",
      uri: "/api/delegates/fee",
      method: "get",
      remark: "",
      req: [
        {
          name: "publicKey",
          type: "string",
          isRequired: true,
          desc: "受托人公钥"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "fee",
          type: "integer",
          desc: "转账费"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getForgedByDelegate: {
      name: "根据公钥查看其锻造情况",
      uri: "/api/delegates/forging/getForgedByAccount",
      method: "get",
      remark: "",
      req: [
        {
          name: "generatorPublicKey",
          type: "string",
          isRequired: true,
          desc: "区块生成者公钥"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "fees",
          type: "integer",
          desc: "收取的手续费"
        },
        {
          name: "rewards",
          type: "integer",
          desc: "已获得奖励"
        },
        {
          name: "forged",
          type: "integer",
          desc: "锻造获得的总奖励"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    addDelegate: {
      name: "注册受托人",
      uri: "/api/delegates",
      method: "put",
      remark: "",
      req: [
        {
          name: "secret",
          type: "string",
          isRequired: true,
          desc: "账户密码"
        },
        {
          name: "publicKey",
          type: "string",
          isRequired: false,
          desc: "公钥"
        },
        {
          name: "secondSecret",
          type: "string",
          isRequired: false,
          desc: "账户二级密码，最小长度：1，最大长度：100"
        },
        {
          name: "username",
          type: "string",
          isRequired: true,
          desc: "受托人名字"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transaction",
          type: "json",
          desc: "交易信息"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    unDelegate: {
      name: "注销受托人",
      uri: "/api/delegates/undelegate",
      method: "put",
      remark: "",
      req: [
        {
          name: "secret",
          type: "string",
          isRequired: true,
          desc: "账户密码"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transaction",
          type: "json",
          desc: "交易信息"
        }
      ],
      reqExample: {},
      resExample: {}
    }
  },
  peers: {
    peers: {
      name: "获取全网节点信息",
      uri: "/api/peers",
      method: "get",
      remark: "",
      req: [
        {
          name: "state",
          type: "integer",
          isRequired: false,
          desc: "节点状态"
        },
        {
          name: "os",
          type: "string",
          isRequired: false,
          desc: "内核版本"
        },
        {
          name: "version",
          type: "string",
          isRequired: false,
          desc: "版本号"
        },
        {
          name: "limit",
          type: "integer",
          isRequired: false,
          desc: "限制结果集个数，最小值：0,最大值：100"
        },
        {
          name: "orderBy",
          type: "string",
          isRequired: false,
          desc: "排序"
        },
        {
          name: "offset",
          type: "integer",
          isRequired: false,
          desc: "步长，最小值0"
        },
        {
          name: "port",
          type: "integer",
          isRequired: false,
          desc: "端口，1~65535"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "peers",
          type: "Array",
          desc: "节点信息json构成的数组"
        },
        {
          name: "count",
          type: "integer",
          desc: "当前正在运行的节点个数"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    version: {
      name: "获取节点版本信息",
      uri: "/api/peers/version",
      method: "get",
      remark: "",
      req: [],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "version",
          type: "string",
          desc: "版本号"
        },
        {
          name: "build",
          type: "string",
          desc: "版本类型"
        },
        {
          name: "net",
          type: "string",
          desc: "主链或者测试链"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getPeerByIp: {
      name: "获取特定ip节点信息",
      uri: "/api/peers/get",
      method: "get",
      remark: "",
      req: [
        {
          name: "ip",
          type: "string",
          isRequired: true,
          desc: "待查询节点ip"
        },
        {
          name: "port",
          type: "string",
          isRequired: true,
          desc: "待查询节点端口，1~65535"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "peer",
          type: "json",
          desc: "节点信息"
        }
      ],
      reqExample: {},
      resExample: {}
    }
  },
  loader: {
    status: {
      name: "查看本地区块链加载状态",
      uri: "/api/loader/status",
      method: "get",
      remark: "",
      req: [],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "loaded",
          type: "bool",
          desc: "是否在加载"
        },
        {
          name: "blocksCount",
          type: "integer",
          desc: "已加载区块数量"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    sync: {
      name: "查看区块同步信息",
      uri: "/api/loader/status/sync",
      method: "get",
      remark: "",
      req: [],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "syncing",
          type: "false",
          desc: "是否在同步"
        },
        {
          name: "blocks",
          type: "integer",
          desc: "正在同步区块数量"
        },
        {
          name: "height",
          type: "integer",
          desc: "区块高度"
        }
      ],
      reqExample: {},
      resExample: {}
    }
  },
  signatures: {
    setSignature: {
      name: "设置二级密码",
      uri: "/api/signatures",
      method: "put",
      remark: "",
      req: [
        {
          name: "secret",
          type: "string",
          isRequired: true,
          desc: "账户密码"
        },
        {
          name: "publicKey",
          type: "string",
          isRequired: false,
          desc: "公钥"
        },
        {
          name: "secondSecret",
          type: "string",
          isRequired: true,
          desc: "账户二级密码，最小长度：1，最大长度：100"
        },
        {
          name: "multisigAccountPublicKey",
          type: "string",
          isRequired: false,
          desc: "多重签名账户公钥"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transaction",
          type: "json",
          desc: "交易信息"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    signatureFee: {
      name: "获取二级密码设置费",
      uri: "/api/signatures/fee",
      method: "get",
      remark: "",
      req: [],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "fee",
          type: "integer",
          desc: "手续费"
        }
      ],
      reqExample: {},
      resExample: {}
    }
  },
  multisignatures: {
    setMulti: {
      name: "设置普通账户为多重签名账户",
      uri: "/api/multisignatures",
      method: "put",
      remark:
        "返回结果只是生成交易id，还需要其他人签名后该账户才能成功设置成多重签名账户。注册多重签名账户后任意一笔转账都需要多人签名，签名最少个数为min的值（含交易发起人自身）",
      req: [
        {
          name: "secret",
          type: "string",
          isRequired: true,
          desc: "账户密码"
        },
        {
          name: "publicKey",
          type: "string",
          isRequired: false,
          desc: "公钥"
        },
        {
          name: "secondSecret",
          type: "string",
          isRequired: false,
          desc: "账户二级密码，最小长度：1，最大长度：100"
        },
        {
          name: "min",
          type: "integer",
          isRequired: true,
          desc:
            "多重签名交易账户的任意一笔转账都需要多人签名的最少个数，如果是注册多重签名账户操作，这该值不生效（此时需要所有人都签名）。最小值：2，最大值：16,该值需要小于keysgroup.length+1"
        },
        {
          name: "lifetime",
          type: "integer",
          isRequired: true,
          desc: "多重签名交易的最大挂起时间，最小值：1，最大值：24，暂时不生效"
        },
        {
          name: "keysgroup",
          type: "array",
          isRequired: true,
          desc:
            "其它签名人的公钥数组，每个公钥前需要加上+或者-号，代表增加/删除多重签名账户，数组最小长度：1，数组最大长度：10"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transactionId",
          type: "string",
          desc: "交易id"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    pending: {
      name: "获取挂起的多重签名交易详情",
      uri: "/api/multisignatures/pending",
      method: "get",
      remark: "",
      req: [
        {
          name: "publicKey",
          type: "string",
          isRequired: true,
          desc: "公钥"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transactions",
          type: "Array",
          desc: "交易json组成的数组"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    sign: {
      name: "非交易发起人对交易进行签名",
      uri: "/api/multisignatures/sign",
      method: "post",
      remark: "",
      req: [
        {
          name: "secret",
          type: "string",
          isRequired: true,
          desc: "账户密码"
        },
        {
          name: "publicKey",
          type: "string",
          isRequired: false,
          desc: "公钥"
        },
        {
          name: "secondSecret",
          type: "string",
          isRequired: false,
          desc: "账户二级密码，最小长度：1，最大长度：100"
        },
        {
          name: "transactionId",
          type: "string",
          isRequired: true,
          desc: "交易id"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transactionId",
          type: "string",
          desc: "交易id"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    accounts: {
      name: "获取多重签名账户信息",
      uri: "/api/multisignatures/accounts",
      method: "get",
      remark: "设置为签名人的pubkicKey才可查询，交易发起人不能查到",
      req: [
        {
          name: "publicKey",
          type: "string",
          isRequired: true,
          desc: "公钥"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "accounts",
          type: "Array",
          desc: "多重签名账户详情"
        }
      ],
      reqExample: {},
      resExample: {}
    }
  },
  lockvote: {
    createLock: {
      name: "增加锁仓",
      uri: "/api/lockvote",
      method: "put",
      remark: "",
      req: [
        {
          name: "secret",
          type: "string",
          isRequired: true,
          desc: "账户密码"
        },
        {
          name: "publicKey",
          type: "string",
          isRequired: false,
          desc: "公钥"
        },
        {
          name: "secondSecret",
          type: "string",
          isRequired: false,
          desc: "账号对应的二级密码，如果有设置二级密码，则此项必填"
        },
        {
          name: "multisigAccountPublicKey",
          type: "string",
          isRequired: false,
          desc: "多重签名公钥"
        },
        {
          name: "args",
          type: "array",
          isRequired: true,
          desc: "包含锁仓金额的数组，如:*['1000']"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transactionId",
          type: "string",
          desc: "交易id"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getLock: {
      name: "获取特定锁仓信息",
      uri: "/api/lockvote/get",
      method: "get",
      remark: "获取特定锁仓交易",
      req: [
        {
          name: "id",
          type: "string",
          isRequired: true,
          desc: "交易id"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "id",
          type: "Array",
          desc: "交易Id"
        },
        {
          name: "blockId",
          type: "Array",
          desc: "区块Id"
        },
        {
          name: "senderId",
          type: "Array",
          desc: "发送者Id"
        },
        {
          name: "timestamp",
          type: "integer",
          desc: "交易创建的时间"
        },
        {
          name: "asset",
          type: "object",
          desc: "锁仓交易的详细信息"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    getAllLocks: {
      name: "获取所有锁仓信息",
      uri: "/api/lockvote/all",
      method: "get",
      remark: "获取所有的锁仓交易信息",
      req: [
        {
          name: "address",
          type: "string",
          isRequired: true,
          desc: "指定的交易发起人地址"
        },
        {
          name: "state",
          type: "integer",
          isRequired: false,
          desc: "1表示正在锁定的锁仓，0表示已经解锁的锁仓"
        },
        {
          name: "offset",
          type: "integer",
          isRequired: false,
          desc: "从索引0开始的起始索引值"
        },
        {
          name: "limit",
          type: "integer",
          isRequired: false,
          desc: "分页的大小，最大为100"
        },
        {
          name: "orderByHeight",
          type: "integer",
          isRequired: false,
          desc: "高度排序 : 1表示升序排列，0表示不排列，-1表示降序排列"
        },
        {
          name: "orderByAmount",
          type: "integer",
          isRequired: false,
          desc: "锁仓量排序 : 1表示升序排列，0表示不排列，-1表示降序排列"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "trs",
          type: "Array",
          desc: "所有锁仓交易信息"
        }
      ],
      reqExample: {},
      resExample: {}
    },
    removeLock: {
      name: "解锁仓交易",
      uri: "/api/lockvote/remove",
      method: "put",
      remark: "解锁已锁仓内容",
      req: [
        {
          name: "secret",
          type: "string",
          isRequired: true,
          desc: "账户密码"
        },
        {
          name: "publicKey",
          type: "string",
          isRequired: false,
          desc: "公钥"
        },
        {
          name: "secondSecret",
          type: "string",
          isRequired: false,
          desc: "账号对应的二级密码，如果有设置二级密码，则此项必填"
        },
        {
          name: "multisigAccountPublicKey",
          type: "string",
          isRequired: false,
          desc: "多重签名公钥"
        },
        {
          name: "args",
          type: "array",
          isRequired: true,
          desc: "包含锁仓交易的id列表，如：*[id1, id2, id3]*"
        }
      ],
      res: [
        {
          name: "success",
          type: "bool",
          desc: "请求是否成功"
        },
        {
          name: "transactionId",
          type: "string",
          desc: "交易id"
        }
      ],
      reqExample: {},
      resExample: {}
    }
  }
};

export default data;
