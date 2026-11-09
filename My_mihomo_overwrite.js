// 深度参考 AnYiEE & mwmi 大佬配置，适配 Mac
//https://gist.github.com/AnYiEE/fdce3f476dbdc1a905c9255d71c131f7
//https://github.com/mwmi/ClashVergeGlobalScript
// 参考 Verge Rev 示例 Script 配置

// 🟢 针对 .list 文本规则：万能兼容模式
const txtProvider = {
  "type": "http",
  "format": "text",
  "behavior": "classical", // 设为 classical 以兼容 DOMAIN-KEYWORD 和 IP-CIDR  
  "interval": 86400
};

// 🔵 针对 .mrs 二进制规则：极致性能模式
const mrsProvider = {
  "type": "http",
  "format": "mrs",
  "behavior": "domain",    // MRS 核心优势是 Domain 树匹配，设为 domain 性能最高
  "interval": 86400
};

const groupBaseOption = {
  "url": "https://cp.cloudflare.com/generate_204",
  "interval": 300,
  "tolerance": 80,
  "timeout": 5000,
  "lazy": true  // 新增：懒加载，减少启动压力
};

const excludeFilter = "(?i)Traffic|Expire|Premium|GB|流量|到期|过期|剩余|已用|余额|订阅|官网|网址|地址|获取|更新|版本|备用|通知|提示|说明|教程|联系|客服|工单|频道|群|邀请|关注|返利|公益|机场|禁止|无法|超时|企业|通路|本站|失联|⚠️|@";

function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object"
      ? Object.keys(config["proxy-providers"]).length
      : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // ── 基础设置 ──────────────────────────────────────────
  config["mixed-port"] = 7890;
  config["allow-lan"] = false;          // 修复：Mac 个人使用改为 false，true 会暴露局域网
  config["ipv6"] = true;
  config["log-level"] = "warning";      // 修复：error 级别太低会漏掉有用日志，改 warning
  config["find-process-mode"] = "off";  // 修复：strict 在 Mac 需要完整磁盘权限，改为 off
  config["keep-alive-idle"] = 120;      // 有效：120秒无数据才开始探测
  config["keep-alive-interval"] = 30;   // 有效：探测包间隔30秒
  config["tcp-concurrent"] = true;
  config["unified-delay"] = true;
  config["profile"] = {
    "store-selected": true,
    "store-fake-ip": true
  };
  config["ntp"] = {
    "enable": true,
    "write-to-system": false,
    "server": "time.apple.com",
    "server-port": 123
  };
  config["hosts"] = {
    "dns.alidns.com": ["223.5.5.5", "223.6.6.6"],
    "dns.google":     ["8.8.8.8", "8.8.4.4"]
  };
  config["global-client-fingerprint"] = "chrome";
  if (config["proxy-providers"]) {
    Object.values(config["proxy-providers"]).forEach(p => {
      p.override = {
        ...(p.override || {}),
        "client-fingerprint": "chrome"
      };
    });
  }
  if (config["proxies"]) {
    config.proxies.forEach(p => {
      if (["vmess", "vless", "trojan", "anytls"].includes(p.type)) {
        p["client-fingerprint"] = p["client-fingerprint"] || "chrome";
      }
    });
  }

  // ── DNS ──────────────────────────────────────────────
config["dns"] = {
    "enable": true,
    "ipv6": true,
    "use-hosts": true,
    "use-system-hosts": true,
    "respect-rules": true,
    "cache-algorithm": "arc",
    "listen": "127.0.0.1:1053",
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": ["+.lan", "+.local", "+.localdomain", "localhost", "time.apple.com", "time.windows.com", "time.cloudflare.com", "+.pool.ntp.org", "+.ntp.org", "ntp.aliyun.com", "ntp1.aliyun.com", "+.stun.*", "stun.*", "+.msftconnecttest.com", "+.msftncsi.com", "captive.apple.com", "*.apple.com.cn", "localhost.ptlogin2.qq.com", "+.wechat.com", "+.weixin.qq.com", "+.wx.qq.com", "+.servicewechat.com", "+.qq.com", "+.tencent.com", "+.gtimg.com", "+.qpic.cn", "+.qlogo.cn", "+.tenpay.com", "+.xiaohongshu.com", "+.xhscdn.com", "+.xhslink.com", "+.xhsamy.com", "+.xhesp.com", "+.xhs-ai.com", "+.pupufz.com", "+.pupuapp.com", "+.pupu.com", "+.pupucdn.com", "+.feishu.cn", "+.feishu.net", "+.feishucdn.com", "+.feishuimg.com", "+.feishupkg.com", "+.larksuite.com", "+.dingtalk.com", "+.dingtalk.net", "+.taobao.com", "+.tmall.com", "+.alipay.com", "+.alipayobjects.com", "+.alibaba.com", "+.alicdn.com", "+.aliyun.com", "+.aliyuncs.com", "+.idlefish.com", "+.xianyu.com", "+.jd.com", "+.jd.id", "+.360buy.com", "+.360buyimg.com", "+.jdpay.com", "+.baidu.com", "+.bdimg.com", "+.bdstatic.com", "+.baidupcs.com", "+.meituan.com", "+.meituan.net", "+.dianping.com", "+.dpfile.com", "+.sankuai.com", "+.bilibili.com", "+.biligame.com", "+.bilivideo.com", "+.bilivideo.cn", "+.biliapi.com", "+.biliapi.net", "+.hdslb.com", "+.163.com", "+.163yun.com", "+.126.com", "+.126.net", "+.unionpay.com", "+.unionpaysecure.com", "+.95516.com", "+.icbc.com.cn", "+.cmbchina.com", "+.ccb.com", "+.abchina.com", "+.bankofchina.com", "+.douyin.com", "+.snssdk.com", "+.bytedance.com", "+.byteimg.com", "+.pstatp.com", "+.toutiao.com", "+.ixigua.com", "+.kuaishou.com", "+.gifshow.com", "+.weibo.com", "+.weibocdn.com", "+.pinduoduo.com", "+.yangkeduo.com", "+.amap.com", "+.autonavi.com", "+.ele.me", "+.zhihu.com", "+.zhimg.com", "+.iqiyi.com", "+.youku.com", "+.mgtv.com", "+.wps.cn", "+.wps.com", "+.kdocs.cn", "+.aliyundrive.com", "+.alipan.com", "+.xunlei.com"],
    "default-nameserver": ["223.5.5.5", "119.29.29.29"],
    "nameserver": ["https://cloudflare-dns.com/dns-query", "https://dns.google/dns-query"],
    "direct-nameserver": ["https://dns.alidns.com/dns-query", "https://doh.pub/dns-query"],
    "proxy-server-nameserver": ["223.5.5.5", "119.29.29.29"],
    "fallback": []
  };
  // ── GeoData ───────────────────────────────────────────
  config["geodata-mode"] = true;
  config["geodata-loader"] = "standard";   // 有效：Mac 内存充足推荐
  config["geosite-matcher"] = "succinct";  // 有效：更快域名匹配算法
  config["geox-url"] = {
    "geoip":   "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat",
    "geosite": "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat",
    "mmdb":    "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb",
    "asn":     "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/GeoLite2-ASN.mmdb"
  };

  // ── Sniffer ───────────────────────────────────────────
config["sniffer"] = {
    "enable": true,
    "force-dns-mapping": true,
    "parse-pure-ip": true,
    "sniff": {
      "TLS":  { "ports": ["443", "8443"] },
      "HTTP": { "ports": ["80", "8080", "8880"], "override-destination": true }
    },
    "skip-domain": ["time.apple.com", "ntp.aliyun.com", "captive.apple.com", "msftconnecttest.com", "msftncsi.com", "*.github.com", "+.rules.dat", "+.rules.mrs"]
  };

  // ── 代理组 ────────────────────────────────────────────
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "🔰 节点选择",
      "type": "select",
      "proxies": ["🔯 故障转移", "🌊 低载链路", "⚖️ 负载均衡", "🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点"], 
      "include-all": true,
      "exclude-filter": excludeFilter,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Proxy.png"
    },
    {
      ...groupBaseOption,
      "name": "🔯 故障转移",
      "type": "fallback",
      "proxies": ["🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "exclude-filter": excludeFilter,
      "interval": 500,  
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Find_My.png"
    },
    {
      ...groupBaseOption,
      "name": "🌊 低载链路",
      "type": "url-test",
      "include-all": true,
      "filter": "(?i)0\\.|低倍|宽带|流量|⁶|实验",
      "exclude-filter": excludeFilter,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Available_1.png"
    },
    {
      ...groupBaseOption,
      "name": "⚖️ 负载均衡",
      "type": "load-balance",
      "interval": 900,   
      "strategy": "consistent-hashing",
      "include-all": true,
      "exclude-filter": excludeFilter,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Round_Robin.png"
    },
    {
      ...groupBaseOption,
      "name": "✅ 微信服务",
      "type": "select",
      "proxies": ["DIRECT", "🇭🇰 香港节点"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/WeChat.png"
    },
    {
      ...groupBaseOption,
      "name": "😀 脸书服务",
      "type": "select",
      "proxies": ["🔰 节点选择", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "include-all": true,
      "filter": "(?i)US|美国|JP|日本|TW|台湾|SG|新加坡",  
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Facebook.png"
    },
    {
      ...groupBaseOption,
      "name": "🤖 AI服务",
      "type": "select",
      "proxies": ["🇺🇸 美国节点", "🇸🇬 狮城节点", "🇹🇼 台湾节点", "🇯🇵 日本节点"],      
      "include-all": true,
      "exclude-filter": "(?i)香港|HK|港|澳门|MO|Russia|俄|Iran|伊朗|KP|朝鲜|Cuba|古巴|Syria|叙利亚|Venezuela|委内瑞拉|Afghanistan|阿富汗|Myanmar|缅甸|Sudan|苏丹|Turkey|TR|Argentina|AR",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Bot.png"
    },
    {
      ...groupBaseOption,
      "name": "📢 谷歌服务",
      "type": "select",
      "proxies": ["🇺🇸 美国节点", "🇸🇬 狮城节点", "🇹🇼 台湾节点", "🇯🇵 日本节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Google_Search.png"
    },
    {
      ...groupBaseOption,
      "name": "📹 油管视频",
      "type": "select",
      "proxies": ["🔰 节点选择", "🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/YouTube.png"
    },
    {
      ...groupBaseOption,
      "name": "🎵 TikTok服务",
      "type": "select",
      "proxies": ["🔰 节点选择", "🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/TikTok.png"
    },
    {
      ...groupBaseOption,
      "name": "🍎 苹果服务",
      "type": "select",
      "proxies": ["🔰 节点选择", "🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Apple_1.png"
    },
    {
      ...groupBaseOption,
      "name": "Ⓜ️ 微软服务",
      "type": "select",
      "proxies": ["🌊 低载链路", "🔰 节点选择", "🇭🇰 香港节点", "🇺🇸 美国节点", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Microsoft.png"
    },
    {
      ...groupBaseOption,
      "name": "📲 电报消息",
      "type": "select",
      "proxies": ["🌊 低载链路", "🔰 节点选择", "🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png"
    },
    {
      ...groupBaseOption,
      "name": "🎧 Spotify音乐",
      "type": "select",
      "proxies": ["🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Spotify.png"
    },
    {
      ...groupBaseOption,
      "name": "🛑 广告拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Advertising.png"
    },
    {
      ...groupBaseOption,
      "name": "🐟 漏网之鱼",
      "type": "select",
      "proxies": ["🔰 节点选择", "🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Final.png"
    },
    {
      ...groupBaseOption,
      "name": "🇭🇰 香港节点",
      "type": "url-test",
      "include-all": true,
      "filter": "(?i)🇭🇰|香港|(\\b(HK|Hong)\\b)",
      "exclude-filter": excludeFilter,  
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Hong_Kong.png"
    },
    {
      ...groupBaseOption,
      "name": "🇹🇼 台湾节点",
      "type": "url-test",
      "include-all": true,
      "filter": "(?i)🇹🇼|台湾|(\\b(TW|Tai|Taiwan)\\b)",
      "exclude-filter": excludeFilter,
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/China.png"
    },
    {
      ...groupBaseOption,
      "name": "🇯🇵 日本节点",
      "type": "url-test",
      "include-all": true,
      "filter": "(?i)🇯🇵|日本|东京|(\\b(JP|Japan)\\b)",
      "exclude-filter": excludeFilter,
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Japan.png"
    },
    {
      ...groupBaseOption,
      "name": "🇸🇬 狮城节点",
      "type": "url-test",
      "include-all": true,
      "filter": "(?i)🇸🇬|新加坡|狮|(\\b(SG|Singapore)\\b)",
      "exclude-filter": excludeFilter,
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png"
    },
    {
      ...groupBaseOption,
      "name": "🇺🇸 美国节点",
      "type": "url-test",
      "include-all": true,
      "filter": "(?i)🇺🇸|美国|洛杉矶|圣何塞|(\\b(US|United States)\\b)",
      "exclude-filter": excludeFilter,
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/United_States.png"
    }
  ];

  // ── Rule Providers ────────────────────────────────────
  config["rule-providers"] = {
    "Block": {
      ...txtProvider,
      "url": "https://raw.githubusercontent.com/cioooou/subconverterini/main/Block.list",
      "path": "./rules/Block.list"
    },
    "UnBan": {
      ...txtProvider,
      "url": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/UnBan.list",
      "path": "./rules/UnBan.list"
    },
    "WeChat": {
      ...txtProvider,
      "url": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Wechat.list",
      "path": "./rules/WeChat.list"
    },
    "AI": {
      ...txtProvider,
      "url": "https://raw.githubusercontent.com/cioooou/subconverterini/refs/heads/main/AI.list",
      "path": "./rules/AI.list"
    },
    "GoogleFCM": {
      ...txtProvider,
      "url": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleFCM.list",
      "path": "./rules/GoogleFCM.list"
    },
    "YouTube": {
      ...mrsProvider,
      "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/youtube.mrs",
      "path": "./rules/youtube.mrs"
    },
    "Google": {
      ...mrsProvider,
      "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/google.mrs",   
      "path": "./rules/google.mrs"
    },
    "Facebook": {
      ...mrsProvider,
      "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/facebook.mrs",
      "path": "./rules/facebook.mrs"
    },
    "Instagram": {
      ...mrsProvider,
      "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/instagram.mrs",
      "path": "./rules/instagram.mrs"
    },
    "Apple": {
      ...mrsProvider,
      "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/apple.mrs",
      "path": "./rules/apple.mrs"
    },
    "Telegram": {
      ...txtProvider,
      "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Telegram/Telegram.list",
      "path": "./rules/Telegram.list"
    },
    "TikTok": {
      ...mrsProvider,
      "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/tiktok.mrs",
      "path": "./rules/tiktok.mrs"
    },
    "Spotify": {
      ...mrsProvider,
      "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/spotify.mrs",
      "path": "./rules/spotify.mrs"
    },
    "Microsoft": {
      ...txtProvider,
      "url": "https://raw.githubusercontent.com/cioooou/subconverterini/refs/heads/main/Microsoft.list",
      "path": "./rules/Microsoft.list"
    },
    "Proxy": {
      ...txtProvider,
      "url": "https://raw.githubusercontent.com/cioooou/subconverterini/refs/heads/main/Proxy.list",
      "path": "./rules/Proxy.list"
    },
    "Lan": {
      ...txtProvider,
      "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Lan/Lan.list",
      "path": "./rules/Lan.list"
    },
    "Download": {
      ...txtProvider,
      "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Download/Download.list",
      "path": "./rules/Download.list"
    },
    "China": {
      ...txtProvider,
      "url": "https://raw.githubusercontent.com/cioooou/subconverterini/refs/heads/main/China.list",
      "path": "./rules/China.list"
    }
  };

  // ── Rules ─────────────────────────────────────────────
  config["rules"] = [
    "RULE-SET,UnBan,DIRECT",
    "RULE-SET,WeChat,✅ 微信服务",
    "RULE-SET,Block,🛑 广告拦截",
    "RULE-SET,China,DIRECT",
    "RULE-SET,AI,🤖 AI服务",
    "RULE-SET,GoogleFCM,📢 谷歌服务",
    "RULE-SET,YouTube,📹 油管视频",
    "RULE-SET,Google,📢 谷歌服务",
    "RULE-SET,Facebook,😀 脸书服务",
    "RULE-SET,Instagram,😀 脸书服务",
    "RULE-SET,TikTok,🎵 TikTok服务",
    "RULE-SET,Apple,🍎 苹果服务",
    "RULE-SET,Telegram,📲 电报消息",
    "RULE-SET,Spotify,🎧 Spotify音乐",
    "RULE-SET,Microsoft,Ⓜ️ 微软服务",
    "RULE-SET,Lan,DIRECT",
    "GEOSITE,private,DIRECT",
    "GEOIP,private,DIRECT,no-resolve",
    "RULE-SET,Download,DIRECT",
    "GEOSITE,cn,DIRECT",
    "GEOIP,CN,DIRECT",
    "RULE-SET,Proxy,🔰 节点选择",
    "MATCH,🐟 漏网之鱼"
  ];

  return config;
}
