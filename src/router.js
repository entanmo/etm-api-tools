import Vue from "vue";
import Router from "vue-router";
import PageView from "@/layouts/PageView";
import RouteView from "@/layouts/RouteView";
import MenuView from "@/layouts/MenuView";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "En-Tan-Mo",
      component: MenuView,
      redirect: "/workspace/home",
      icon: "none",
      invisible: true,
      children: [
        {
          path: "/workspace",
          name: "工作台",
          component: RouteView,
          icon: "global",
          children: [
            {
              path: "/workspace/home",
              name: "首页",
              component: () => import("@/menus/workspace/home"),
              icon: "home"
            },
            {
              path: "/workspace/analysis",
              name: "分析页",
              component: RouteView,
              icon: "bar-chart",
              children: [
                {
                  path: "/workspace/analysis/tps",
                  name: "TPS计算",
                  component: () => import("@/menus/workspace/analysis/tps"),
                  icon: "none"
                },
                {
                  path: "/workspace/analysis/generateBlock",
                  name: "出块统计",
                  component: () =>
                    import("@/menus/workspace/analysis/generateBlock"),
                  icon: "none"
                },
                {
                  path: "/workspace/analysis/trs",
                  name: "交易统计",
                  component: () => import("@/menus/workspace/analysis/trs"),
                  icon: "none"
                },
                // {
                //   path: "/workspace/analysis/votes",
                //   name: "票数统计",
                //   component: () => import("@/menus/workspace/analysis/votes"),
                //   icon: "none"
                // },
                {
                  path: "/workspace/analysis/miner",
                  name: "矿工统计",
                  component: () => import("@/menus/workspace/analysis/miner"),
                  icon: "none"
                }
              ]
            },
            {
              path: "/workspace/test",
              name: "测试页",
              component: RouteView,
              icon: "issues-close",
              children: [
                {
                  path: "/workspace/test/trs",
                  name: "交易测试",
                  component: () => import("@/menus/workspace/test/trs"),
                  icon: "none"
                }
              ]
            }
          ]
        },
        {
          path: "/tools",
          name: "工具页",
          component: RouteView,
          icon: "tool",
          children: [
            {
              path: "/tools/transactions",
              name: "交易页",
              component: RouteView,
              icon: "swap",
              children: [
                {
                  path: "/tools/transactions/transfer",
                  name: "转账交易",
                  component: () =>
                    import("@/menus/tools/transactions/Transfer"),
                  icon: "none"
                },
                {
                  path: "/tools/transactions/delegate",
                  name: "代理交易",
                  component: () =>
                    import("@/menus/tools/transactions/Delegate"),
                  icon: "none"
                },
                {
                  path: "/tools/transactions/lock",
                  name: "锁仓交易",
                  component: () => import("@/menus/tools/transactions/Lock"),
                  icon: "none"
                },
                {
                  path: "/tools/transactions/vote",
                  name: "投票交易",
                  component: () => import("@/menus/tools/transactions/Vote"),
                  icon: "none"
                },
                {
                  path: "/tools/transactions/freeze",
                  name: "冻结交易",
                  component: () => import("@/menus/tools/transactions/Freeze"),
                  icon: "none"
                },
                {
                  path: "/tools/transactions/second",
                  name: "二级密码交易",
                  component: () => import("@/menus/tools/transactions/Second"),
                  icon: "none"
                },
                {
                  path: "/tools/transactions/multi",
                  name: "多重签名交易",
                  component: () => import("@/menus/tools/transactions/Multi"),
                  icon: "none"
                }
              ]
            },
            {
              path: "/tools/queryInfo",
              name: "查询页",
              component: PageView,
              icon: "search",
              children: [
                {
                  path: "/tools/queryInfo/basic",
                  name: "账户信息",
                  component: () => import("@/menus/tools/queryInfo/Account"),
                  icon: "none"
                },
                {
                  path: "/tools/queryInfo/step",
                  name: "交易信息",
                  component: () =>
                    import("@/menus/tools/queryInfo/Transaction"),
                  icon: "none"
                },
                {
                  path: "/tools/queryInfo/advanced",
                  name: "区块信息",
                  component: () => import("@/menus/tools/queryInfo/Block"),
                  icon: "none"
                }
              ]
            },
            {
              path: "/tools/createFile",
              name: "生成页",
              icon: "form",
              component: RouteView,
              children: [
                {
                  path: "/tools/createFile/account",
                  name: "生成账号",
                  icon: "none"
                  // component: () => import('@/menus/tools/createFile/account')
                },
                {
                  path: "/tools/createFile/genesis",
                  name: "生成创世快",
                  icon: "none"
                  // component: () => import('@/menus/tools/createFile/genesis')
                }
              ]
            }
          ]
        },
        {
          path: "/api",
          name: "接口页",
          component: RouteView,
          icon: "api",
          children: [
            {
              path: "/api/accounts",
              name: "账户",
              icon: "user",
              component: RouteView,
              redirect: "/api/accounts/open",
              children: [
                {
                  path: "/api/accounts/open",
                  name: "登录",
                  icon: "none",
                  component: () => import("@/menus/api/accounts/open")
                },
                {
                  path: "/api/accounts/open2",
                  name: "公钥登录",
                  icon: "none",
                  component: () => import("@/menus/api/accounts/open2")
                },
                {
                  path: "/api/accounts/getAccount",
                  name: "获取账户信息",
                  icon: "none",
                  component: () => import("@/menus/api/accounts/getAccount")
                },
                {
                  path: "/api/accounts/getBalance",
                  name: "获取账户余额",
                  icon: "none",
                  component: () => import("@/menus/api/accounts/getBalance")
                },
                {
                  path: "/api/accounts/getPublickey",
                  name: "获取账户公钥",
                  icon: "none",
                  component: () => import("@/menus/api/accounts/getPublickey")
                },
                {
                  path: "/api/accounts/generatePublickey",
                  name: "生成公钥",
                  icon: "none",
                  component: () =>
                    import("@/menus/api/accounts/generatePublickey")
                },
                {
                  path: "/api/accounts/delegates",
                  name: "根据地址获取其投票列表",
                  icon: "none",
                  component: () => import("@/menus/api/accounts/delegates")
                },
                {
                  path: "/api/accounts/delegateFee",
                  name: "获取投票手续费",
                  icon: "none",
                  component: () => import("@/menus/api/accounts/delegateFee")
                },
                {
                  path: "/api/accounts/vote",
                  name: "创建投票",
                  icon: "none",
                  component: () => import("@/menus/api/accounts/vote")
                },
                {
                  path: "/api/accounts/top",
                  name: "获取账户排行榜前100名",
                  icon: "none",
                  component: () => import("@/menus/api/accounts/top")
                },
                {
                  path: "/api/accounts/delayOrders",
                  name: "查询延迟到账列表",
                  icon: "none",
                  component: () => import("@/menus/api/accounts/delayOrders")
                },
                {
                  path: "/api/accounts/effectivity",
                  name: "账户是否在链上",
                  icon: "none",
                  component: () => import("@/menus/api/accounts/effectivity")
                },
                {
                  path: "/api/accounts/new",
                  name: "新建账号",
                  icon: "none",
                  component: () => import("@/menus/api/accounts/new")
                }
              ]
            },
            {
              path: "/api/transactions",
              name: "交易",
              icon: "interation",
              component: RouteView,
              redirect: "/api/transactions/getTransaction",
              children: [
                {
                  path: "/api/transactions/getTransaction",
                  name: "获取交易信息",
                  icon: "none",
                  component: () =>
                    import("@/menus/api/transactions/getTransaction")
                },
                {
                  path: "/api/transactions/getTransactionById",
                  name: "根据id查看交易详情",
                  icon: "none",
                  component: () =>
                    import("@/menus/api/transactions/getTransactionById")
                },
                {
                  path: "/api/transactions/getUncomfirmedById",
                  name: "根据id获取未确认交易",
                  icon: "none",
                  component: () =>
                    import("@/menus/api/transactions/getUncomfirmedById")
                },
                {
                  path: "/api/transactions/getUnconfirmed",
                  name: "获取未确认的交易详情",
                  icon: "none",
                  component: () =>
                    import("@/menus/api/transactions/getUnconfirmed")
                },
                {
                  path: "/api/transactions/createTransaction",
                  name: "创建交易",
                  icon: "none",
                  component: () =>
                    import("@/menus/api/transactions/createTransaction")
                },
                {
                  path: "/api/transactions/delay",
                  name: "延迟到账交易",
                  icon: "none",
                  component: () => import("@/menus/api/transactions/delay")
                }
              ]
            },
            {
              path: "/api/blocks",
              name: "区块",
              icon: "switcher",
              component: RouteView,
              redirect: "/api/blocks/getBlock",
              children: [
                {
                  path: "/api/blocks/getBlock",
                  name: "获取特定区块详情",
                  icon: "none",
                  component: () => import("@/menus/api/blocks/getBlock")
                },
                {
                  path: "/api/blocks/getBlockByField",
                  name: "查询符合条件的区块",
                  icon: "none",
                  component: () => import("@/menus/api/blocks/getBlockByField")
                },
                {
                  path: "/api/blocks/getHeight",
                  name: "获取区块链高度",
                  icon: "none",
                  component: () => import("@/menus/api/blocks/getHeight")
                },
                {
                  path: "/api/blocks/getFee",
                  name: "获取交易手续费",
                  icon: "none",
                  component: () => import("@/menus/api/blocks/getFee")
                },
                {
                  path: "/api/blocks/getMilestone",
                  name: "获取里程碑",
                  icon: "none",
                  component: () => import("@/menus/api/blocks/getMilestone")
                },
                {
                  path: "/api/blocks/getReward",
                  name: "查看单个区块奖励",
                  icon: "none",
                  component: () => import("@/menus/api/blocks/getReward")
                },
                {
                  path: "/api/blocks/getSupply",
                  name: "获取区块链当前最大供应值",
                  icon: "none",
                  component: () => import("@/menus/api/blocks/getSupply")
                },
                {
                  path: "/api/blocks/getStatus",
                  name: "区块链状态",
                  icon: "none",
                  component: () => import("@/menus/api/blocks/getStatus")
                }
              ]
            },
            {
              path: "/api/delegates",
              name: "受托人",
              icon: "contacts",
              component: RouteView,
              redirect: "/api/delegates/count",
              children: [
                {
                  path: "/api/delegates/count",
                  name: "获取受托人总个数",
                  icon: "none",
                  component: () => import("@/menus/api/delegates/count")
                },
                {
                  path: "/api/delegates/voters",
                  name: "查看受托人投票者",
                  icon: "none",
                  component: () => import("@/menus/api/delegates/voters")
                },
                {
                  path: "/api/delegates/getDelegate",
                  name: "获取受托人详情",
                  icon: "none",
                  component: () => import("@/menus/api/delegates/getDelegate")
                },
                {
                  path: "/api/delegates/getAllDelegates",
                  name: "获取受托人列表",
                  icon: "none",
                  component: () =>
                    import("@/menus/api/delegates/getAllDelegates")
                },
                {
                  path: "/api/delegates/delegateFee",
                  name: "获取受托人设置的转账费",
                  icon: "none",
                  component: () => import("@/menus/api/delegates/delegateFee")
                },
                {
                  path: "/api/delegates/getForgedByDelegate",
                  name: "查看受托人锻造情况",
                  icon: "none",
                  component: () =>
                    import("@/menus/api/delegates/getForgedByDelegate")
                },
                {
                  path: "/api/delegates/addDelegate",
                  name: "注册受托人",
                  icon: "none",
                  component: () => import("@/menus/api/delegates/addDelegate")
                },
                {
                  path: "/api/delegates/unDelegate",
                  name: "注消受托人",
                  icon: "none",
                  component: () => import("@/menus/api/delegates/unDelegate")
                }
              ]
            },
            {
              path: "/api/peers",
              name: "节点",
              icon: "deployment-unit",
              component: RouteView,
              redirect: "/api/peers/peers",
              children: [
                {
                  path: "/api/peers/peers",
                  name: "获取全网节点信息",
                  icon: "none",
                  component: () => import("@/menus/api/peers/peers")
                },
                {
                  path: "/api/peers/version",
                  name: "获取节点版本信息",
                  icon: "none",
                  component: () => import("@/menus/api/peers/version")
                },
                {
                  path: "/api/peers/getPeerByIp",
                  name: "获取特定ip节点信息",
                  icon: "none",
                  component: () => import("@/menus/api/peers/getPeerByIp")
                }
              ]
            },
            {
              path: "/api/loader",
              name: "加载",
              icon: "file-sync",
              component: RouteView,
              redirect: "/api/loader/status",
              children: [
                {
                  path: "/api/loader/status",
                  name: "查看本地区块链加载状态",
                  icon: "none",
                  component: () => import("@/menus/api/loader/status")
                },
                {
                  path: "/api/loader/sync",
                  name: "查看区块同步信息",
                  icon: "none",
                  component: () => import("@/menus/api/loader/sync")
                }
              ]
            },
            {
              path: "/api/signatures",
              name: "二级密码",
              icon: "key",
              component: RouteView,
              redirect: "/api/signatures/setSignature",
              children: [
                {
                  path: "/api/signatures/setSignature",
                  name: "设置二级密码",
                  icon: "none",
                  component: () => import("@/menus/api/signatures/setSignature")
                },
                {
                  path: "/api/signatures/signatureFee",
                  name: "获取二级密码设置费",
                  icon: "none",
                  component: () => import("@/menus/api/signatures/signatureFee")
                }
              ]
            },
            {
              path: "/api/multisignatures",
              name: "多重签名",
              icon: "usergroup-add",
              component: RouteView,
              redirect: "/api/multisignatures/setMulti",
              children: [
                {
                  path: "/api/multisignatures/setMulti",
                  name: "设置普通账户为多重签名账户",
                  icon: "none",
                  component: () =>
                    import("@/menus/api/multisignatures/setMulti")
                },
                {
                  path: "/api/multisignatures/pending",
                  name: "获取挂起的多重签名交易详情",
                  icon: "none",
                  component: () => import("@/menus/api/multisignatures/pending")
                },
                {
                  path: "/api/multisignatures/sign",
                  name: "非交易发起人对交易进行签名",
                  icon: "none",
                  component: () => import("@/menus/api/multisignatures/sign")
                },
                {
                  path: "/api/multisignatures/accounts",
                  name: "获取多重签名账户信息",
                  icon: "none",
                  component: () =>
                    import("@/menus/api/multisignatures/accounts")
                }
              ]
            },
            {
              path: "/api/lockvote",
              name: "锁仓",
              icon: "lock",
              component: RouteView,
              redirect: "/api/lockvote/createLock",
              children: [
                {
                  path: "/api/lockvote/createLock",
                  name: "创建锁仓",
                  icon: "none",
                  component: () => import("@/menus/api/lockvote/createLock")
                },
                {
                  path: "/api/lockvote/removeLock",
                  name: "解锁仓",
                  icon: "none",
                  component: () => import("@/menus/api/lockvote/removeLock")
                },
                {
                  path: "/api/lockvote/getAllLocks",
                  name: "获取所有锁仓列表",
                  icon: "none",
                  component: () => import("@/menus/api/lockvote/getAllLocks")
                },
                {
                  path: "/api/lockvote/getLock",
                  name: "获取锁仓信息",
                  icon: "none",
                  component: () => import("@/menus/api/lockvote/getLock")
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});
