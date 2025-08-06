// 参考 Verge Rev 示例 Script 配置
//
// Clash Verge Rev (Version ≥ 17.2) & Mihomo-Party (Version ≥ 0.5.8)
//
// 最后更新时间: 2025-08-07

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "text",
  "interval": 43200 // 每12小时更新规则
};

// 策略组通用配置
const groupBaseOption = {
  "interval": 300,
  "url": "http://connectivitycheck.gstatic.com/generate_204",
  "max-failed-times": 2,
  "include-all": true,
  "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|企业",
};

// 覆写 fake-ip-filter
function overwriteFakeIpFilter(params) {
  const fakeIpFilter = [
    "*",
    "+.lan",
    "+.local",
    "+.direct",
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    "+.internal",
    "+.localdomain",
    "+.home.arpa",
    "dns.msftncsi.com",
    "*.srv.nintendo.net",
    "*.stun.playstation.net",
    "xbox.*.microsoft.com",
    "*.xboxlive.com",
    "*.turn.twilio.com",
    "*.stun.twilio.com",
    "stun.syncthing.net",
    "stun.*",
    "*.sslip.io",
    "*.nip.io",
    "router.asus.com",
    "repeater.asus.com",
    "+.asusrouter.com",
    "+.routerlogin.net",
    "+.routerlogin.com",
    "+.tplinkwifi.net",
    "+.tplogin.cn",
    "+.tplinkap.net",
    "+.tplinkmodem.net",
    "+.tplinkplclogin.net",
    "+.tplinkrepeater.net",
    "*.huaweimobilewifi.com",
    "console.gl-inet.com",
    "homerouter.cpe",
    "mobile.hotspot",
    "ntt.setup",
    "pi.hole",
    "*.plex.direct",
    "+.10.in-addr.arpa",
    "+.16.172.in-addr.arpa",
    "+.17.172.in-addr.arpa",
    "+.18.172.in-addr.arpa",
    "+.19.172.in-addr.arpa",
    "+.20.172.in-addr.arpa",
    "+.21.172.in-addr.arpa",
    "+.22.172.in-addr.arpa",
    "+.23.172.in-addr.arpa",
    "+.24.172.in-addr.arpa",
    "+.25.172.in-addr.arpa",
    "+.26.172.in-addr.arpa",
    "+.27.172.in-addr.arpa",
    "+.28.172.in-addr.arpa",
    "+.29.172.in-addr.arpa",
    "+.30.172.in-addr.arpa",
    "+.31.172.in-addr.arpa",
    "+.168.192.in-addr.arpa",
    "+.254.169.in-addr.arpa",
    "+.apple.com",
    "+.icloud.com",
    "+.itunes.com",
    "+.me.com",
    "202561.a-ss256ss.wan-wan-ni-suansuande.com"
  ];
  params.dns["fake-ip-filter"] = fakeIpFilter;
}

// 覆写 nameserver-policy
function overwriteNameserverPolicy(params) {
  const nameserverPolicy = {
    "*.lan": "system",
    "*.local": "system",
    "*.internal": "system",
    "*.localdomain": "system",
    "*.home.arpa": "system",
    "router.asus.com": "system",
    "repeater.asus.com": "system",
    "+.asusrouter.com": "system",
    "+.routerlogin.net": "system",
    "+.routerlogin.com": "system",
    "+.tplinkwifi.net": "system",
    "+.tplogin.cn": "system",
    "+.tplinkap.net": "system",
    "+.tplinkmodem.net": "system",
    "+.tplinkplclogin.net": "system",
    "+.tplinkrepeater.net": "system",
    "*.huaweimobilewifi.com": "system",
    "console.gl-inet.com": "system",
    "homerouter.cpe": "system",
    "mobile.hotspot": "system",
    "ntt.setup": "system",
    "pi.hole": "system",
    "*.plex.direct": "system",
    "+.alibaba.com": ["quic://dns.alidns.com:853", "223.5.5.5"],
    "*.alicdn.com": ["quic://dns.alidns.com:853", "223.5.5.5"],
    "+.aliyun.com": ["quic://dns.alidns.com:853", "223.5.5.5"],
    "*.aliyuncs.com": ["quic://dns.alidns.com:853", "223.5.5.5"],
    "+.alipay.com": ["quic://dns.alidns.com:853", "223.5.5.5"],
    "*.alipayobjects.com": ["quic://dns.alidns.com:853", "223.5.5.5"],
    "+.taobao.com": ["quic://dns.alidns.com:853", "223.5.5.5"],
    "+.tmall.com": ["quic://dns.alidns.com:853", "223.5.5.5"],
    "+.youku.com": ["quic://dns.alidns.com:853", "223.5.5.5"],
    "+.ele.me": ["quic://dns.alidns.com:853", "223.5.5.5"],
    "+.dingtalk.com": ["quic://dns.alidns.com:853", "223.5.5.5"],
    "+.cainiao.com": ["quic://dns.alidns.com:853", "223.5.5.5"],
    "+.bilibili.com": ["https://doh.pub/dns-query", "1.12.12.12"],
    "*.bilivideo.com": ["https://doh.pub/dns-query", "1.12.12.12"],
    "*.hdslb.com": ["https://doh.pub/dns-query", "1.12.12.12"],
    "+.qq.com": ["https://doh.pub/dns-query", "1.12.12.12"],
    "*.myqcloud.com": ["https://doh.pub/dns-query", "1.12.12.12"],
    "+.tencent.com": ["https://doh.pub/dns-query", "1.12.12.12"],
    "+.weixin.com": ["https://doh.pub/dns-query", "1.12.12.12"],
    "+.douyin.com": ["180.184.2.2", "114.114.114.114"],
    "+.ixigua.com": ["180.184.2.2", "114.114.114.114"],
    "+.toutiao.com": ["180.184.2.2", "114.114.114.114"],
    "+.feishu.cn": ["180.184.2.2", "114.114.114.114"],
    "+.baidu.com": ["180.76.76.76", "114.114.114.114"],
    "*.bdstatic.com": ["180.76.76.76", "114.114.114.114"],
    "*.bdimg.com": ["180.76.76.76", "114.114.114.114"],
    "+.iqiyi.com": ["180.76.76.76", "114.114.114.114"],
    "+.360.cn": ["https://doh.360.cn/dns-query", "101.198.198.198"],
    "+.so.com": ["https://doh.360.cn/dns-query", "101.198.198.198"],
    "+.google.com": ["https://dns.google/dns-query", "8.8.8.8"],
    "+.youtube.com": ["https://dns.google/dns-query", "8.8.8.8"],
    "+.gstatic.com": ["https://dns.google/dns-query", "8.8.8.8"],
    "+.apple.com": ["https://1.1.1.1/dns-query", "1.0.0.1"],
    "+.icloud.com": ["https://1.1.1.1/dns-query", "1.0.0.1"],
    "+.itunes.com": ["https://1.1.1.1/dns-query", "1.0.0.1"],
    "202561.a-ss256ss.wan-wan-ni-suansuande.com": ["https://dns.google/dns-query", "8.8.8.8", "1.1.1.1"],
    "default": ["https://dns.google/dns-query", "https://1.1.1.1/dns-query", "114.114.114.114"]
  };
  params.dns["nameserver-policy"] = nameserverPolicy;
}

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖通用配置
  config["mixed-port"] = "7890";
  config["tcp-concurrent"] = true;
  config["allow-lan"] = true;
  config["ipv6"] = true;
  config["log-level"] = "debug"; // 保持 debug 模式
  config["unified-delay"] = "true";
  config["find-process-mode"] = "strict";
  config["global-client-fingerprint"] = "chrome";

  // 覆盖 DNS 配置
  config["dns"] = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": [],
    "nameserver": [
      "https://dns.google/dns-query",
      "https://1.1.1.1/dns-query",
      "114.114.114.114"
    ],
    "fallback": [
      "https://8.8.8.8/dns-query",
      "https://1.0.0.1/dns-query"
    ],
    "nameserver-policy": {}
  };

  // 调用覆写函数
  overwriteFakeIpFilter(config);
  overwriteNameserverPolicy(config);

  // 覆盖 sniffer 配置
  config["sniffer"] = {
    "enable": true,
    "parse-pure-ip": true,
    "sniff": {
      "TLS": {
        "ports": ["443", "8443"]
      },
      "HTTP": {
        "ports": ["80", "8080", "8880"],
        "override-destination": true
      },
      "QUIC": {
        "ports": ["443", "8443", "8080"]
      }
    }
  };

  // TUN 配置
  config["tun"] = {
    "enable": true,
    "stack": "gVisor",
    "dns-hijack": ["tcp://any:53", "udp://any:53"],
    "mtu": 1500
  };

  // 覆盖策略组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,   
      "name": "🔰 节点选择",
      "type": "select",
      "proxies": ["🔯 故障转移", "⚖️ 负载均衡", "🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点"],     
      "include-all": true,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|企业",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Airport.png"   
    },  
    {
      ...groupBaseOption,
      "name": "🔯 故障转移",
      "type": "fallback",
      "proxies": ["🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点", "⚖️ 负载均衡"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Find_My.png"
    },  
    {
      ...groupBaseOption,
      "name": "⚖️ 负载均衡",
      "type": "load-balance",
      "interval": "300",
      "url": "http://www.gstatic.com/generate_204",
      "timeout": 1500,
      "strategy": "consistent-hashing",
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Available.png"
    },      
    {
      ...groupBaseOption,
      "name": "✅微信服务",
      "type": "select",
      "proxies": ["DIRECT", "🇭🇰 香港节点"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/WeChat.png"
    },  
    {
      ...groupBaseOption,
      "name": "🏳️‍🌈IP归属地伪装",
      "type": "select",
      "proxies": ["DIRECT", "🔰 节点选择", "🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "icon": "https://img.icons8.com/?size=144&id=9A9UJY1V3Zw9&format=png&color=000000"
    },    
    {
      ...groupBaseOption,
      "name": "😀脸书服务",
      "type": "select",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Facebook.png"
    },         
    {
      ...groupBaseOption,
      "name": "🤖AI服务",
      "type": "select",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ChatGPT.png"
    }, 
    {
      ...groupBaseOption,
      "name": "🎶TikTok服务",
      "type": "select",
      "proxies": ["🔰 节点选择", "🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/TikTok.png"
    },       
    {
      ...groupBaseOption,
      "name": "🍎苹果服务",
      "type": "select",
      "proxies": ["🔰 节点选择", "🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Apple_1.png"
    },
        {
      ...groupBaseOption,
      "name": "⌨️ GitHub",
      "type": "select",
      "proxies": ["🔰 节点选择", "🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/refs/heads/master/IconSet/Color/GitHub.png"
    },
    {
      ...groupBaseOption,
      "name": "Ⓜ️微软服务",
      "type": "select",
      "proxies": ["🔰 节点选择", "🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Microsoft.png"
    },
    {
      ...groupBaseOption,
      "name": "📢谷歌服务",
      "type": "select",
      "proxies": ["🔰 节点选择", "🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Google_Search.png"
    },
    {
      ...groupBaseOption,
      "name": "📲电报SG",
      "type": "select",
      "proxies": ["🇸🇬 狮城节点", "🇺🇸 美国节点", "🔰 节点选择"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png"
    },
    {
      ...groupBaseOption,
      "name": "📲电报US",
      "type": "select",
      "proxies": [ "🇺🇸 美国节点", "🇸🇬 狮城节点", "🔰 节点选择"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png"
    },    
    {
      ...groupBaseOption,
      "name": "📲电报NL",
      "type": "select",
      "proxies": ["🇸🇬 狮城节点", "🇺🇸 美国节点", "🔰 节点选择"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png"
    },       
    {
      ...groupBaseOption,
      "name": "📺️Emby影视",
      "type": "select",
      "proxies": ["DIRECT", "🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Emby.png"
    },
    {
      ...groupBaseOption,
      "name": "🎧Spotify音乐",
      "type": "select",
      "proxies": ["🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Spotify.png"
    },    
    {
      ...groupBaseOption,
      "name": "🛑广告拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Advertising.png"
    },
    {
      ...groupBaseOption,
      "name": "🍀 应用净化",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hijacking.png"
    },    
    {
      ...groupBaseOption,
      "name": "🐟漏网之鱼",
      "type": "select",
      "proxies": ["🔰 节点选择", "🇭🇰 香港节点", "🇹🇼 台湾节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇸 美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Final.png"
    },
    // 地区分组
   {
      ...groupBaseOption,
      "name": "🇭🇰 香港节点",
      "type": "load-balance",
      "interval": 300,
      "url": "http://www.gstatic.com/generate_204",
      "timeout": 1500,
      "strategy": "consistent-hashing",
      "include-all": true,
      "filter": "(?i)🇭🇰|香港|(\b(HK|Hong)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Hong_Kong.png"
    },
    {
      ...groupBaseOption,
      "name": "🇹🇼 台湾节点",
      "type": "load-balance",
      "interval": 300,
      "url": "http://www.gstatic.com/generate_204",
      "timeout": 1500,
      "strategy": "consistent-hashing",
      "include-all": true,
      "filter": "(?i)🇨🇳|🇹🇼|台湾|(\b(TW|Tai|Taiwan)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/China.png"
    },
    {
      ...groupBaseOption,
      "name": "🇯🇵 日本节点",
      "type": "load-balance",
      "interval": 300,
      "url": "http://www.gstatic.com/generate_204",
      "timeout": 1500,
      "strategy": "consistent-hashing",
      "include-all": true,
      "filter": "(?i)🇯🇵|日本|东京|(\b(JP|Japan)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Japan.png"
    },        
    {
      ...groupBaseOption,
      "name": "🇸🇬 狮城节点",
      "type": "load-balance",
      "interval": 300,
      "url": "http://www.gstatic.com/generate_204",
      "timeout": 1500,
      "strategy": "consistent-hashing",
      "include-all": true,
      "filter": "(?i)🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png"
    },
    {
      ...groupBaseOption,
      "name": "🇺🇸 美国节点",
      "type": "load-balance",
      "interval": 300,
      "url": "http://www.gstatic.com/generate_204",
      "timeout": 1500,
      "strategy": "consistent-hashing",
      "include-all": true,
      "filter": "(?i)🇺🇸|美国|洛杉矶|圣何塞|(\b(US|United States)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/United_States.png"   
    }    
  ];

  // 覆盖规则集
  config["rule-providers"] = {
    "Block": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/cioooou/subconverterini/main/Block.list",
      "path": "./rules/Block.list"
    },
    "BanAD": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list",
      "path": "./rules/BanAD.list"
    },
    "BanProgramAD": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanProgramAD.list",
      "path": "./rules/BanProgramAD.list"
    },  
    "IPfake": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/SunsetMkt/anti-ip-attribution/refs/heads/main/generated/surge.list",
      "path": "./rules/IPfake.list"
    },         
    "WeChat": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/Repcz/Tool/refs/heads/X/Surge/Rules/WeChat.list",
      "path": "./rules/WeChat.list"      
    },
    "Facebook": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/Repcz/Tool/refs/heads/X/Clash/Rules/Facebook.list",
      "path": "./rules/Facebook.list"  
    },
    "Instagram": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/Repcz/Tool/refs/heads/X/Clash/Rules/Instagram.list",
      "path": "./rules/Instagram.list"           
    },    
    "AI": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/AI.list",
      "path": "./rules/AI.list"
    },  
    "AIGPT": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/cioooou/subconverterini/main/AIGPT.list",
      "path": "./rules/AIGPT.list"
    },      
    "Apple": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Apple.list",
      "path": "./rules/Apple.list"
    },
    "GoogleCN": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleCN.list",
      "path": "./rules/GoogleCN.list"
    },
    "Google": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Google.list",
      "path": "./rules/Google.list"
    },
    "GoogleCNProxyIP": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleCNProxyIP.list",
      "path": "./rules/GoogleCNProxyIP.list"
    },
    "GoogleFCM": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleFCM.list",
      "path": "./rules/GoogleFCM.list"
    },                
    "TelegramSG": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/TelegramSG/TelegramSG.list",
      "path": "./rules/TelegramSG.list"
    },
    "TelegramUS": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/TelegramUS/TelegramUS.list",
      "path": "./rules/TelegramUS.list"
    },
    "TelegramNL": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/TelegramNL/TelegramNL.list",
      "path": "./rules/TelegramNL.list"
    },        
    "TikTok": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/TikTok/TikTok.list",
      "path": "./rules/TikTok.list"
    },    
    "Emby": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/cioooou/subconverterini/refs/heads/main/Emby.list",
      "path": "./rules/Emby.list"
    },
    "Spotify": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Spotify.list",
      "path": "./rules/Spotify.list"
    },
    "GitHub": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/GitHub/GitHub.list",
      "path": "./rules/GitHub.list"
    },
    "OneDrive": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/OneDrive.list",
      "path": "./rules/OneDrive.list"
    },
    "Github": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Github.list",
      "path": "./rules/Github.list"
    },
    "Microsoft": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Microsoft.list",
      "path": "./rules/Microsoft.list"
    },
    "Lan": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Lan.list",
      "path": "./rules/Lan.list"
    },
    "UnBan": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/UnBan.list",
      "path": "./rules/UnBan.list"
    },
    "Download": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Download/Download.list",
      "path": "./rules/Download.list"
    },
    "Alibaba": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Surge/Alibaba/Alibaba_Resolve.list",
      "path": "./Alibaba_Resolve.list"
    },                   
    "Proxy": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/ProxyLite.list",
      "path": "./rules/ProxyLite.list"
    },
    "Geo": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/DH-Teams/DH-Geo_AS_IP_CN/main/Geo_AS_IP_CN_V4_Surge.list",
      "path": "./rules/Geo_AS_IP_CN_V4_Surge.list"
    }
  };

  // 覆盖规则
  config["rules"] = [
    "RULE-SET,Block,🛑广告拦截",
    "RULE-SET,BanAD,🛑广告拦截",
    "RULE-SET,BanProgramAD,🍀 应用净化",
    "RULE-SET,IPfake,🏳️‍🌈IP归属地伪装",    
    "RULE-SET,WeChat,✅微信服务",
    "RULE-SET,Facebook,😀脸书服务",
    "RULE-SET,Instagram,😀脸书服务",    
    "RULE-SET,AI,🤖AI服务",
    "RULE-SET,AIGPT,🤖AI服务",    
    "RULE-SET,TikTok,🎶TikTok服务",
    "RULE-SET,Apple,🍎苹果服务",
    "RULE-SET,GoogleCN,📢谷歌服务",
    "RULE-SET,Google,📢谷歌服务",
    "RULE-SET,GoogleCNProxyIP,📢谷歌服务",
    "RULE-SET,GoogleFCM,📢谷歌服务",
    "RULE-SET,TelegramSG,📲电报SG",
    "RULE-SET,TelegramUS,📲电报US",
    "RULE-SET,TelegramNL,📲电报NL",        
    "RULE-SET,Emby,📺️Emby影视",
    "RULE-SET,Spotify,🎧Spotify音乐",
    "RULE-SET,Github,⌨️ GitHub",
    "GEOSITE,onedrive,Ⓜ️微软服务",
    "GEOSITE,github,Ⓜ️微软服务",
    "GEOSITE,microsoft,Ⓜ️微软服务",
    "RULE-SET,Proxy,🔰 节点选择",
    "RULE-SET,Lan,DIRECT",    
    "RULE-SET,UnBan,DIRECT",
    "RULE-SET,Download,DIRECT",
    "RULE-SET,Alibaba,DIRECT",
    "RULE-SET,Geo,DIRECT",
    "GEOIP,CN,DIRECT", // 使用 GeoIP 规则
    "MATCH,🐟漏网之鱼"
  ];

  // 返回修改后的配置
  return config;
}
