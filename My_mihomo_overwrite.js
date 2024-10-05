// 参考 Verge Rev 示例 Script 配置
//
// Clash Verge Rev (Version ≥ 17.2) & Mihomo-Party (Version ≥ 0.5.8)
//
// 最后更新时间: 2024-09-28 22:50

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "text",
  "interval": 86400
};

// 策略组通用配置
const groupBaseOption = {
  "interval": 300,
  "url": "http://connectivitycheck.gstatic.com/generate_204",
  "max-failed-times": 3,
};

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
  config["ipv6"] = false;
  config["log-level"] = "info";
  config["unified-delay"] = "true";
  config["find-process-mode"] = "strict";
  config["global-client-fingerprint"] = "chrome";

  // 覆盖 dns 配置
  config["dns"] = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": ["*", "+.lan", "+.local", "+.direct", "+.msftconnecttest.com", "+.msftncsi.com"],
    "default-nameserver": ["system"],
    "nameserver": ["223.5.5.5", "119.29.29.29", "180.184.1.1"],
    "nameserver-policy": {
      "geosite:cn": "system",
      "geosite:gfw,geolocation-!cn": ["quic://223.5.5.5", "quic://223.6.6.6", "https://1.12.12.12/dns-query", "https://120.53.53.53/dns-query"]
    }
  };

  // 覆盖 geodata 配置
  config["geodata-mode"] = true;
  config["geox-url"] = {
    "geoip": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
    "geosite": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    "mmdb": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
    "asn": "https://mirror.ghproxy.com/https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"
  };

  // 覆盖 sniffer 配置
  config["sniffer"] = {
    "enable": true,
    "parse-pure-ip": true,
    "sniff": {
      "TLS": {
        "ports": ["443", "8443"]
      },
      "HTTP": {
        "ports": ["80", "8080-8880"],
        "override-destination": true
      },
      "QUIC": {
        "ports": ["443", "8443"]
      }
    }
  };

  // 覆盖 tun 配置
  config["tun"] = {
    "enable": true,
    "stack": "mixed",
    "dns-hijack": ["any:53"]
  };

  // 覆盖策略组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "节点选择",
      "type": "select",
      "proxies": ["故障转移", "香港节点", "台湾节点", "日本节点", "狮城节点", "美国节点", "手动切换", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Airport.png"
    },  
    {
      ...groupBaseOption,
      "name": "故障转移",
      "type": "fallback",
      "proxies": ["香港节点", "台湾节点", "日本节点", "狮城节点", "美国节点"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Find_My.png"
    },  
    {
      ...groupBaseOption,
      "name": "手动切换",
      "type": "select",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Domestic.png"
    },
    {
      ...groupBaseOption,
      "name": "微信服务",
      "type": "select",
      "proxies": ["DIRECT", "香港节点"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/WeChat.png"
    },  
    {
      ...groupBaseOption,
      "name": "脸书服务",
      "type": "select",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Facebook.png"
    },         
    {
      ...groupBaseOption,
      "name": "AI服务",
      "type": "select",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ChatGPT.png"
    }, 
    {
      ...groupBaseOption,
      "name": "TikTok服务",
      "type": "select",
      "proxies": ["节点选择", "香港节点", "台湾节点", "日本节点", "狮城节点", "美国节点"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/TikTok.png"
    },       
    {
      ...groupBaseOption,
      "name": "苹果服务",
      "type": "select",
      "proxies": ["节点选择", "香港节点", "台湾节点", "日本节点", "狮城节点", "美国节点", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Apple_1.png"
    },
    {
      ...groupBaseOption,
      "name": "微软服务",
      "type": "select",
      "proxies": ["节点选择", "香港节点", "台湾节点", "日本节点", "狮城节点", "美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Microsoft.png"
    },
    {
      ...groupBaseOption,
      "name": "谷歌服务",
      "type": "select",
      "proxies": ["节点选择", "香港节点", "台湾节点", "日本节点", "狮城节点", "美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Google_Search.png"
    },
    {
      ...groupBaseOption,
      "name": "电报消息",
      "type": "select",
      "proxies": ["节点选择", "香港节点", "台湾节点", "日本节点", "狮城节点", "美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png"
    },
    {
      ...groupBaseOption,
      "name": "Emby影视",
      "type": "select",
      "include-all": true,
      "filter": "(?i)0.01x|Emby|0.2x",      
      "proxies": ["节点选择", "香港节点", "台湾节点", "日本节点", "狮城节点", "美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Emby.png"
    },
    {
      ...groupBaseOption,
      "name": "Spotify音乐",
      "type": "select",
      "include-all": true,
      "proxies": ["狮城节点", "美国节点"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Spotify.png"
    },    
    {
      ...groupBaseOption,
      "name": "广告拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Advertising.png"
    },
    {
      ...groupBaseOption,
      "name": "漏网之鱼",
      "type": "select",
      "proxies": ["节点选择", "香港节点", "台湾节点", "日本节点", "狮城节点", "美国节点"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Final.png"
    },
    // 地区分组
    {
      ...groupBaseOption,
      "name": "香港节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇭🇰|香港|(\b(HK|Hong)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Hong_Kong.png"
    },
    {
      ...groupBaseOption,
      "name": "台湾节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇨🇳|🇹🇼|台湾|(\b(TW|Tai|Taiwan)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/China.png"
    },
    {
      ...groupBaseOption,
      "name": "日本节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇯🇵|日本|东京|(\b(JP|Japan)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Japan.png"
    },        
    {
      ...groupBaseOption,
      "name": "狮城节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png"
    },
    {
      ...groupBaseOption,
      "name": "美国节点",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|TG|tg|群组|频道|订阅|ISP|流量|到期|重置|付费|网址|更新|Emby|0.01x|0.2x",         
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
    "Apple": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Apple.list",
      "path": "./rules/Apple.list"
    },
    "Google": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Google.list",
      "path": "./rules/Google.list"
    },
    "YouTube": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/YouTube.list",
      "path": "./rules/YouTube.list"
    },
    "Telegram": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Telegram.list",
      "path": "./rules/Telegram.list"
    },
    "TikTok": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/TikTok.list",
      "path": "./rules/TikTok.list"
    },
    "TikTokCici": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/cioooou/subconverterini/main/TikTokCici.list",
      "path": "./rules/TikTokCici.list"
    },    
    "AI": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/AI.list",
      "path": "./rules/AI.list"
    },
    "Emby": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Emby.list",
      "path": "./rules/Emby.list"
    },
    "Spotify": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Spotify.list",
      "path": "./rules/Spotify.list"
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
    "Direct": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/Direct.list",
      "path": "./rules/Direct.list"
    },  
    "Geo": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/DH-Teams/DH-Geo_AS_IP_CN/main/Geo_AS_IP_CN_All_Surge.list",
      "path": "./rules/Geo_AS_IP_CN_All_Surge.list"
    },                   
    "ProxyGFW": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ProxyGFW.list",
      "path": "./rules/ProxyGFW.list"
    },
    "ChinaDomain": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ChinaDomain.list",
      "path": "./rules/ChinaDomain.list"
    }
  };

  // 覆盖规则
  config["rules"] = [
    "RULE-SET,Block,广告拦截",
    "RULE-SET,WeChat,微信服务",
    "RULE-SET,AI,AI服务",
    "RULE-SET,Facebook,脸书服务",
    "RULE-SET,Instagram,脸书服务",
    "RULE-SET,Apple,苹果服务",
    "RULE-SET,YouTube,谷歌服务",
    "RULE-SET,Google,谷歌服务",
    "RULE-SET,Telegram,电报消息",
    "RULE-SET,TikTok,TikTok服务",
    "RULE-SET,TikTokCici,TikTok服务",
    "RULE-SET,Spotify,Spotify音乐",
    "RULE-SET,Emby,Emby影视",
    "RULE-SET,Spotify,节点选择",
    "GEOSITE,onedrive,微软服务",
    "GEOSITE,github,微软服务",
    "GEOSITE,microsoft,微软服务",
    "GEOSITE,gfw,节点选择",
    "RULE-SET,UnBan,DIRECT",
    "RULE-SET,Download,DIRECT",
    "RULE-SET,Alibaba,DIRECT",
    "RULE-SET,Direct,DIRECT",
    "RULE-SET,Geo,DIRECT",
    "RULE-SET,ChinaDomain,DIRECT",
    "GEOIP,lan,DIRECT",
    "GEOIP,CN,DIRECT",
    "MATCH,漏网之鱼"
  ];

  // 返回修改后的配置
  return config;
}
