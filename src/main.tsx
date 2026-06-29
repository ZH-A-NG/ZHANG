import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Suspense, useCallback, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {
  ArrowUpRight,
  BadgeCheck,
  Box,
  BrainCircuit,
  Clapperboard,
  Cpu,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import commerceWorksData from "./data/commerceWorks.json";
import Lanyard from "./components/ui/Lanyard/Lanyard";
import "./styles.css";

const commerceDetailBasePath = "/work/commerce";

const contact = {
  name: "李辉权",
  phone: "13417741550",
  email: "1784585124@qq.com",
  location: "广东 深圳",
};

const stats = [
  { value: "2025-2026", label: "产品渲染与电商视觉经验" },
  { value: "AI + 3D", label: "概念设计到动态成片流程" },
  { value: "6+", label: "覆盖平台与内容场景" },
  { value: "3", label: "职业技能 / 等级证书" },
];

const portfolioModules = [
  {
    "id": "rendering",
    "title": "产品商业渲染",
    "tag": "Product Rendering",
    "desc": "C4D / Octane 产品渲染、材质质感与商业构图练习，集中展示产品、场景和细节表现。",
    "meta": "13 Works",
    "works": [
      {
        "title": "0 1",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-01.jpg",
        "media": "image",
        "size": "long",
        "original": "0-1.jpg"
      },
      {
        "title": "0 2",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-02.jpg",
        "media": "image",
        "size": "long",
        "original": "0-2.jpg"
      },
      {
        "title": "2",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-03.png",
        "media": "image",
        "size": "",
        "original": "2.png"
      },
      {
        "title": "bj1 5",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-04.png",
        "media": "image",
        "size": "",
        "original": "bj1-5.png"
      },
      {
        "title": "摆件",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-05.jpg",
        "media": "image",
        "size": "",
        "original": "摆件.jpg"
      },
      {
        "title": "产品 耳机",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-06.jpg",
        "media": "image",
        "size": "wide",
        "original": "产品-耳机.jpg"
      },
      {
        "title": "产品 化妆品",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-07.jpg",
        "media": "image",
        "size": "tall",
        "original": "产品-化妆品.jpg"
      },
      {
        "title": "产品 咖啡机",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-08.jpg",
        "media": "image",
        "size": "tall",
        "original": "产品-咖啡机.jpg"
      },
      {
        "title": "产品 香水",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-09.jpg",
        "media": "image",
        "size": "long",
        "original": "产品-香水.jpg"
      },
      {
        "title": "超现实 机器人",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-10.jpg",
        "media": "image",
        "size": "long",
        "original": "超现实-机器人.jpg"
      },
      {
        "title": "手表（1）",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-11.jpg",
        "media": "image",
        "size": "wide",
        "original": "手表（1）.jpg"
      },
      {
        "title": "手表（2）",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-12.jpg",
        "media": "image",
        "size": "tall",
        "original": "手表（2）.jpg"
      },
      {
        "title": "主图",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-13.jpg",
        "media": "image",
        "size": "long",
        "original": "主图.jpg"
      }
    ]
  },
  {
    "id": "motion",
    "title": "产品动画",
    "tag": "Product Motion",
    "desc": "产品动态、镜头运镜与短视频成片内容，展示从模型、灯光到动画输出的动态视觉能力。",
    "meta": "8 Works",
    "works": [
      {
        "title": "9月19日",
        "tag": "产品动画",
        "src": "/portfolio-full/motion/motion-01.mp4",
        "media": "video",
        "size": "video",
        "original": "9月19日.mp4"
      },
      {
        "title": "9月30日",
        "tag": "产品动画",
        "src": "/portfolio-full/motion/motion-02.mp4",
        "media": "video",
        "size": "video",
        "original": "9月30日.mp4"
      },
      {
        "title": "动画3",
        "tag": "产品动画",
        "src": "/portfolio-full/motion/motion-03.mp4",
        "media": "video",
        "size": "video",
        "original": "动画3.mp4"
      },
      {
        "title": "动画4",
        "tag": "产品动画",
        "src": "/portfolio-full/motion/motion-04.mp4",
        "media": "video",
        "size": "video",
        "original": "动画4.mp4"
      },
      {
        "title": "合成 1 7",
        "tag": "产品动画",
        "src": "/portfolio-full/motion/motion-05.mp4",
        "media": "video",
        "size": "video",
        "original": "合成 1_7.mp4"
      },
      {
        "title": "完整2有音樂",
        "tag": "产品动画",
        "src": "/portfolio-full/motion/motion-06.mp4",
        "media": "video",
        "size": "video",
        "original": "完整2有音樂.mp4"
      },
      {
        "title": "小球动画",
        "tag": "产品动画",
        "src": "/portfolio-full/motion/motion-07.mp4",
        "media": "video",
        "size": "video",
        "original": "小球动画.mp4"
      },
      {
        "title": "音乐5版",
        "tag": "产品动画",
        "src": "/portfolio-full/motion/motion-08.mp4",
        "media": "video",
        "size": "video",
        "original": "音乐5版.mp4"
      }
    ]
  },
  {
    "id": "commerce",
    "title": "电商产品视觉",
    "tag": "E-commerce Visual",
    "desc": "围绕三角充、红白机、小包等产品系列制作主图、卖点图和平台商品视觉。",
    "coverSrc": "/portfolio-full/commerce/commerce-07.png",
    "meta": "20 Works",
    "works": [
      {
        "title": "电商卖点图",
        "tag": "红白机",
        "src": "/portfolio-full/commerce/commerce-01.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01DSEnJS1KhooHrsiWm_!!2217560201196.png_q50.jpg_.webp"
      },
      {
        "title": "电商卖点图 ",
        "tag": "红白机",
        "src": "/portfolio-full/commerce/commerce-02.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01EPZhAo1KhonZbASwz_!!2217560201196.png_.webp"
      },
      {
        "title": "电商卖点图",
        "tag": "红白机",
        "src": "/portfolio-full/commerce/commerce-03.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01Pi3p2S1KhooHe5fdT_!!2217560201196.png_q50.jpg_.webp"
      },
      {
        "title": "电商卖点图",
        "tag": "红白机",
        "src": "/portfolio-full/commerce/commerce-04.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01RmleFq1KhooJIhnqU_!!2217560201196.png_q50.jpg_.webp"
      },
      {
        "title": "电商卖点图",
        "tag": "红白机",
        "src": "/portfolio-full/commerce/commerce-05.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01uS4S0o1KhooCz0Wrz_!!2217560201196.png_q50.jpg_.webp"
      },
      {
        "title": "电商卖点图",
        "tag": "红白机",
        "src": "/portfolio-full/commerce/commerce-06.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01ZD4djo1KhooJIjXuu_!!2217560201196.png_q50.jpg_.webp"
      },
      {
        "title": "安装步骤1",
        "tag": "红白机",
        "src": "/portfolio-full/commerce/commerce-07.png",
        "media": "image",
        "size": "wide",
        "original": "安装步骤1.png"
      },
      {
        "title": "电商卖点图",
        "tag": "三角充",
        "src": "/portfolio-full/commerce/commerce-08.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01MrRSSH1KhooRKCty0_!!2217560201196.png_q50.jpg_.webp"
      },
      {
        "title": "电商卖点图",
        "tag": "三角充",
        "src": "/portfolio-full/commerce/commerce-09.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01p3KiL71KhooRcXqL9_!!2217560201196.png_q50.jpg_.webp"
      },
      {
        "title": "电商卖点图",
        "tag": "三角充",
        "src": "/portfolio-full/commerce/commerce-10.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01pw6dvT1KhooRafXKx_!!2217560201196.png_q50.jpg_.webp"
      },
      {
        "title": "电商卖点图",
        "tag": "三角充",
        "src": "/portfolio-full/commerce/commerce-11.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01vH2fAf1KhooRubOAc_!!2217560201196.png_q50.jpg_.webp"
      },
      {
        "title": "电商卖点图",
        "tag": "三角充",
        "src": "/portfolio-full/commerce/commerce-12.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01zm1CiR1KhooSTT4Pn_!!2217560201196.png_q50.jpg_.webp"
      },
      {
        "title": "主图 透明底",
        "tag": "三角充",
        "src": "/portfolio-full/commerce/commerce-13.png",
        "media": "image",
        "size": "",
        "original": "主图-透明底.png"
      },
      {
        "title": "0 1 0001",
        "tag": "小包",
        "src": "/portfolio-full/commerce/commerce-14.png",
        "media": "image",
        "size": "",
        "original": "0-1_0001.png"
      },
      {
        "title": "电商卖点图",
        "tag": "小包",
        "src": "/portfolio-full/commerce/commerce-15.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01aHSS2s1KhooJZQFuz_!!2217560201196.png_q50.jpg_.webp"
      },
      {
        "title": "电商卖点图",
        "tag": "小包",
        "src": "/portfolio-full/commerce/commerce-16.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01hxRuOX1KhooJ2hhIn_!!2217560201196.png_q50.jpg_.webp"
      },
      {
        "title": "电商卖点图",
        "tag": "小包",
        "src": "/portfolio-full/commerce/commerce-17.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01mQH2XK1KhooJXAwuV_!!2217560201196.png_q50.jpg_.webp"
      },
      {
        "title": "电商卖点图",
        "tag": "小包",
        "src": "/portfolio-full/commerce/commerce-18.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01o7lcJ31KhooJDvLhs_!!2217560201196.png_q50.jpg_.webp"
      },
      {
        "title": "电商卖点图 ",
        "tag": "小包",
        "src": "/portfolio-full/commerce/commerce-19.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01OowsE21Khong5YvIM_!!2217560201196.png_.webp"
      },
      {
        "title": "电商卖点图",
        "tag": "小包",
        "src": "/portfolio-full/commerce/commerce-20.webp",
        "media": "image",
        "size": "",
        "original": "O1CN01RP4x8d1KhooJ2gYcX_!!2217560201196.png_q50.jpg_.webp"
      }
    ]
  },
  {
    "id": "site",
    "title": "独立站视觉",
    "tag": "Independent Site",
    "desc": "面向独立站与产品详情页的页面视觉，包括首页、产品页、卖点图和长页面内容。",
    "coverSrc": "/portfolio-full/site/site-cover.webp",
    "meta": "16 Works",
    "works": [
      {
        "title": "hosanwell hc ps5001wh ps5 controll...",
        "tag": "独立站 / 白色ps5",
        "src": "/portfolio-full/site/site-01.webp",
        "media": "image",
        "size": "",
        "original": "hosanwell-hc-ps5001wh-ps5-controller-charging-station_webp.webp"
      },
      {
        "title": "hosanwell hc ps5001wh ps5 disc dig...",
        "tag": "独立站 / 白色ps5",
        "src": "/portfolio-full/site/site-02.webp",
        "media": "image",
        "size": "",
        "original": "hosanwell-hc-ps5001wh-ps5-disc-digital-wall-mount-compatible_webp.webp"
      },
      {
        "title": "hosanwell hc ps5001wh ps5 wall mou...",
        "tag": "独立站 / 白色ps5",
        "src": "/portfolio-full/site/site-03.webp",
        "media": "image",
        "size": "",
        "original": "hosanwell-hc-ps5001wh-ps5-wall-mount-bracket-secure_webp.webp"
      },
      {
        "title": "hosanwell hc ps5001wh ps5 wall mou...",
        "tag": "独立站 / 白色ps5",
        "src": "/portfolio-full/site/site-04.webp",
        "media": "image",
        "size": "",
        "original": "hosanwell-hc-ps5001wh-ps5-wall-mount-easy-installation_webp.webp"
      },
      {
        "title": "hosanwell hc ps5001wh ps5 wall mou...",
        "tag": "独立站 / 白色ps5",
        "src": "/portfolio-full/site/site-05.webp",
        "media": "image",
        "size": "",
        "original": "hosanwell-hc-ps5001wh-ps5-wall-mount-installation-guide_webp.webp"
      },
      {
        "title": "hosanwell hc ps5001wh ps5 wall mou...",
        "tag": "独立站 / 白色ps5",
        "src": "/portfolio-full/site/site-06.webp",
        "media": "image",
        "size": "",
        "original": "hosanwell-hc-ps5001wh-ps5-wall-mount-kit-white_webp.webp"
      },
      {
        "title": "hosanwell hc ps5001wh wall mounted...",
        "tag": "独立站 / 白色ps5",
        "src": "/portfolio-full/site/site-07.webp",
        "media": "image",
        "size": "",
        "original": "hosanwell-hc-ps5001wh-wall-mounted-ps5-living-room-setup_webp.webp"
      },
      {
        "title": "Airflow friendly PS5 wall mount wi...",
        "tag": "独立站 / 白色ps5 / 详情页",
        "src": "/portfolio-full/site/site-08.webp",
        "media": "image",
        "size": "",
        "original": "Airflow-friendly_PS5_wall_mount_with_open_structure_for_better_heat_dissipation_170c4c47-d534-4c6d-a589-2e36aa8e569f.webp"
      },
      {
        "title": "Before and after comparison of a c...",
        "tag": "独立站 / 白色ps5 / 详情页",
        "src": "/portfolio-full/site/site-09.webp",
        "media": "image",
        "size": "",
        "original": "Before_and_after_comparison_of_a_cluttered_gaming_desk_and_a_clean_PS5_wall_mount_setup_1.webp"
      },
      {
        "title": "Compatibility chart for PS5 PS5 Sl...",
        "tag": "独立站 / 白色ps5 / 详情页",
        "src": "/portfolio-full/site/site-10.webp",
        "media": "image",
        "size": "",
        "original": "Compatibility_chart_for_PS5_PS5_Slim_and_PS5_Pro_disc_and_digital_models_ce78d4e1-407c-4437-913d-fe8156ecf2d5.webp"
      },
      {
        "title": "Hosanwell white PS5 wall mount kit...",
        "tag": "独立站 / 白色ps5 / 详情页",
        "src": "/portfolio-full/site/site-11.webp",
        "media": "image",
        "size": "",
        "original": "Hosanwell_white_PS5_wall_mount_kit_with_charging_station_RGB_lighting_airflow_support_and_compatibility_for_PS5_Slim_and_PS5_Pro_64150a90-15e6-407f-936f-53beb1225471.webp"
      },
      {
        "title": "Step by step installation guide fo...",
        "tag": "独立站 / 白色ps5 / 详情页",
        "src": "/portfolio-full/site/site-12.webp",
        "media": "image",
        "size": "",
        "original": "Step-by-step_installation_guide_for_the_Hosanwell_PS5_wall_mount_kit_with_charging_station_c39e3033-12ba-4bd6-bf5f-479965221f93.webp"
      },
      {
        "title": "White PS5 wall mount with RGB ligh...",
        "tag": "独立站 / 白色ps5 / 详情页",
        "src": "/portfolio-full/site/site-13.webp",
        "media": "image",
        "size": "",
        "original": "White_PS5_wall_mount_with_RGB_light_modes_for_a_clean_gaming_room_setup_e7eb57fa-03f9-4e3f-92ab-0e708fd2a53d.webp"
      },
      {
        "title": "白色PS5",
        "tag": "独立站 / 独立站-产品页面",
        "src": "/portfolio-full/site/site-14.png",
        "media": "image",
        "size": "long",
        "original": "白色PS5.png"
      },
      {
        "title": "黑色PS5",
        "tag": "独立站 / 独立站-产品页面",
        "src": "/portfolio-full/site/site-15.png",
        "media": "image",
        "size": "long",
        "original": "黑色PS5.png"
      },
      {
        "title": "主页效果",
        "tag": "独立站 / 独立站-产品页面",
        "src": "/portfolio-full/site/site-16.png",
        "media": "image",
        "size": "long",
        "original": "主页效果.png"
      }
    ]
  },
  {
    "id": "aigc",
    "title": "AIGC 人物概念",
    "tag": "AIGC Character",
    "desc": "AI 人物视觉、产品佩戴场景和概念画面探索，强调商业质感与视觉叙事。",
    "coverSrc": "/portfolio-full/aigc/aigc-04.png",
    "meta": "6 Works",
    "works": [
      {
        "title": "PS5挂架游戏画面版",
        "tag": "AIGC-人物",
        "src": "/portfolio-full/aigc/aigc-01.png",
        "media": "image",
        "size": "tall",
        "original": "PS5挂架游戏画面版.png"
      },
      {
        "title": "高清",
        "tag": "AIGC-人物",
        "src": "/portfolio-full/aigc/aigc-02.png",
        "media": "image",
        "size": "long",
        "original": "高清.png"
      },
      {
        "title": "手部展示 0",
        "tag": "AIGC-人物",
        "src": "/portfolio-full/aigc/aigc-03.png",
        "media": "image",
        "size": "tall",
        "original": "手部展示-0.png"
      },
      {
        "title": "手部展示 1",
        "tag": "AIGC-人物",
        "src": "/portfolio-full/aigc/aigc-04.png",
        "media": "image",
        "size": "tall",
        "original": "手部展示-1.png"
      },
      {
        "title": "效果图",
        "tag": "AIGC-人物",
        "src": "/portfolio-full/aigc/aigc-05.jpg",
        "media": "image",
        "size": "long",
        "original": "效果图.jpg"
      },
      {
        "title": "修过的",
        "tag": "AIGC-人物",
        "src": "/portfolio-full/aigc/aigc-06.png",
        "media": "image",
        "size": "tall",
        "original": "修过的.png"
      }
    ]
  },
  {
    "id": "posters",
    "title": "海报视觉",
    "tag": "Poster Design",
    "desc": "AI 辅助生成的竖版海报和概念视觉，适配社媒传播与活动视觉场景。",
    "coverSrc": "/portfolio-full/posters/posters-03.png",
    "meta": "14 Works",
    "works": [
      {
        "title": "AI视觉 2026年6月16日 12 20 59",
        "tag": "海报",
        "src": "/portfolio-full/posters/posters-01.png",
        "media": "image",
        "size": "tall",
        "original": "ChatGPT Image 2026年6月16日 12_20_59.png"
      },
      {
        "title": "AI视觉 2026年6月16日 12 21 51",
        "tag": "海报",
        "src": "/portfolio-full/posters/posters-02.png",
        "media": "image",
        "size": "tall",
        "original": "ChatGPT Image 2026年6月16日 12_21_51.png"
      },
      {
        "title": "AI视觉 2026年6月16日 12 21 56",
        "tag": "海报",
        "src": "/portfolio-full/posters/posters-03.png",
        "media": "image",
        "size": "tall",
        "original": "ChatGPT Image 2026年6月16日 12_21_56.png"
      },
      {
        "title": "AI视觉 2026年6月16日 12 22 00",
        "tag": "海报",
        "src": "/portfolio-full/posters/posters-04.png",
        "media": "image",
        "size": "tall",
        "original": "ChatGPT Image 2026年6月16日 12_22_00.png"
      },
      {
        "title": "AI视觉 2026年6月16日 12 22 11",
        "tag": "海报",
        "src": "/portfolio-full/posters/posters-05.png",
        "media": "image",
        "size": "tall",
        "original": "ChatGPT Image 2026年6月16日 12_22_11.png"
      },
      {
        "title": "AI视觉 2026年6月16日 12 29 16",
        "tag": "海报",
        "src": "/portfolio-full/posters/posters-06.png",
        "media": "image",
        "size": "",
        "original": "ChatGPT Image 2026年6月16日 12_29_16.png"
      },
      {
        "title": "AI视觉 2026年6月16日 12 29 21",
        "tag": "海报",
        "src": "/portfolio-full/posters/posters-07.png",
        "media": "image",
        "size": "",
        "original": "ChatGPT Image 2026年6月16日 12_29_21.png"
      },
      {
        "title": "AI视觉 2026年6月16日 12 30 21",
        "tag": "海报",
        "src": "/portfolio-full/posters/posters-08.png",
        "media": "image",
        "size": "tall",
        "original": "ChatGPT Image 2026年6月16日 12_30_21.png"
      },
      {
        "title": "AI视觉 2026年6月16日 12 30 25",
        "tag": "海报",
        "src": "/portfolio-full/posters/posters-09.png",
        "media": "image",
        "size": "tall",
        "original": "ChatGPT Image 2026年6月16日 12_30_25.png"
      },
      {
        "title": "AI视觉 2026年6月16日 12 30 28",
        "tag": "海报",
        "src": "/portfolio-full/posters/posters-10.png",
        "media": "image",
        "size": "tall",
        "original": "ChatGPT Image 2026年6月16日 12_30_28.png"
      },
      {
        "title": "AI视觉 2026年6月16日 12 34 18",
        "tag": "海报",
        "src": "/portfolio-full/posters/posters-11.png",
        "media": "image",
        "size": "tall",
        "original": "ChatGPT Image 2026年6月16日 12_34_18.png"
      },
      {
        "title": "AI视觉 2026年6月16日 12 34 54",
        "tag": "海报",
        "src": "/portfolio-full/posters/posters-12.png",
        "media": "image",
        "size": "tall",
        "original": "ChatGPT Image 2026年6月16日 12_34_54.png"
      },
      {
        "title": "AI视觉 2026年6月16日 12 35 10",
        "tag": "海报",
        "src": "/portfolio-full/posters/posters-13.png",
        "media": "image",
        "size": "tall",
        "original": "ChatGPT Image 2026年6月16日 12_35_10.png"
      },
      {
        "title": "AI视觉 2026年6月16日 12 35 14",
        "tag": "海报",
        "src": "/portfolio-full/posters/posters-14.png",
        "media": "image",
        "size": "tall",
        "original": "ChatGPT Image 2026年6月16日 12_35_14.png"
      }
    ]
  },
  {
    "id": "covers",
    "title": "视频封面与社媒图",
    "tag": "Cover / Social Visual",
    "desc": "视频封面、短视频首帧和社媒视觉图，突出点击识别度和产品记忆点。",
    "meta": "9 Works",
    "works": [
      {
        "title": "AI视觉 2026年6月16日 12 19 30",
        "tag": "视频封面",
        "src": "/portfolio-full/covers/covers-01.png",
        "media": "image",
        "size": "tall",
        "original": "ChatGPT Image 2026年6月16日 12_19_30.png"
      },
      {
        "title": "PS5极简高级封面",
        "tag": "视频封面",
        "src": "/portfolio-full/covers/covers-02.png",
        "media": "image",
        "size": "tall",
        "original": "PS5极简高级封面.png"
      },
      {
        "title": "SW2充电底座 三款合集 极简场景",
        "tag": "视频封面",
        "src": "/portfolio-full/covers/covers-03.png",
        "media": "image",
        "size": "tall",
        "original": "SW2充电底座_三款合集_极简场景.png"
      },
      {
        "title": "SW2握把极简高级封面",
        "tag": "视频封面",
        "src": "/portfolio-full/covers/covers-04.png",
        "media": "image",
        "size": "tall",
        "original": "SW2握把极简高级封面.png"
      },
      {
        "title": "Switch2红白机握把产品图 (1)",
        "tag": "视频封面",
        "src": "/portfolio-full/covers/covers-05.png",
        "media": "image",
        "size": "tall",
        "original": "Switch2红白机握把产品图 (1).png"
      },
      {
        "title": "Switch2红白机握把产品图 (2)",
        "tag": "视频封面",
        "src": "/portfolio-full/covers/covers-06.png",
        "media": "image",
        "size": "tall",
        "original": "Switch2红白机握把产品图 (2).png"
      },
      {
        "title": "Switch2红白机握把产品图",
        "tag": "视频封面",
        "src": "/portfolio-full/covers/covers-07.png",
        "media": "image",
        "size": "tall",
        "original": "Switch2红白机握把产品图.png"
      },
      {
        "title": "Switch2红白机握把产品图1",
        "tag": "视频封面",
        "src": "/portfolio-full/covers/covers-08.png",
        "media": "image",
        "size": "tall",
        "original": "Switch2红白机握把产品图1.png"
      },
      {
        "title": "极简高级视频封面图",
        "tag": "视频封面",
        "src": "/portfolio-full/covers/covers-09.png",
        "media": "image",
        "size": "tall",
        "original": "极简高级视频封面图.png"
      }
    ]
  },
  {
    "id": "longform",
    "title": "长图详情页",
    "tag": "Long-form Detail Page",
    "desc": "长图详情页与动态详情页内容，适合纵向浏览产品卖点、功能和使用场景。",
    "meta": "2 Works",
    "works": [
      {
        "title": "最新的详情页 修改 01",
        "tag": "小米音箱 / 详情页",
        "src": "/portfolio-full/longform/longform-01.gif",
        "media": "gif",
        "size": "long",
        "original": "最新的详情页---修改_01.gif"
      },
      {
        "title": "最新的详情页 修改 02",
        "tag": "小米音箱 / 详情页",
        "src": "/portfolio-full/longform/longform-02.gif",
        "media": "gif",
        "size": "long",
        "original": "最新的详情页---修改_02.gif"
      }
    ]
  }
];

function getModuleCoverItem(module) {
  if (module.coverSrc) {
    const coverItem = module.works.find((item) => item.src === module.coverSrc);
    return coverItem || { src: module.coverSrc, media: "image", title: module.title };
  }

  return module.works.find((item) => item.media !== "video") || module.works[0] || { src: "", media: "image", title: module.title };
}

function getModuleCover(module) {
  return getModuleCoverItem(module).src;
}

function getGroupedWorks(module) {
  return module.works.reduce((groups, item) => {
    const key = item.tag || module.title;
    const group = groups.find((entry) => entry.title === key);
    if (group) {
      group.items.push(item);
    } else {
      groups.push({ title: key, items: [item] });
    }
    return groups;
  }, []);
}

function getMediaClass(item) {
  return [item.size, item.media === "video" ? "video-card" : "", item.media === "gif" ? "gif-card" : ""]
    .filter(Boolean)
    .join(" ");
}
const strengths = [
  {
    icon: BrainCircuit,
    title: "AI 设计流程",
    text: "熟悉 GPT、Google Gemini 与 ComfyUI 节点工作流，能把创意策划、图像生成和视觉落地连成一条高效生产线。",
  },
  {
    icon: Box,
    title: "三维商业渲染",
    text: "主攻 Cinema 4D + Octane 产品渲染，理解灯光、材质、镜头与电商场景对产品质感的塑造。",
  },
  {
    icon: Clapperboard,
    title: "动态内容制作",
    text: "覆盖产品动画、短视频拍摄、后期剪辑与社媒内容输出，适配 TikTok、Instagram 等渠道节奏。",
  },
  {
    icon: BadgeCheck,
    title: "品牌视觉执行",
    text: "能围绕平台规范、商品卖点与品牌调性，完成主图、详情页、页面美化和运营素材的持续迭代。",
  },
];

const routeTransition = {
  exitMs: 480,
  reducedExitMs: 80,
};

function getCommerceProjects() {
  const commerceModule = portfolioModules.find((module) => module.id === "commerce");
  if (!commerceModule) return [];

  const importedGroups = normalizeCommerceGroups((commerceWorksData as any).groups).groups;
  const importedWorks = importedGroups.flatMap((group) => group.items);
  if (importedWorks.length > 0) {
    return importedWorks.map((item, index) => ({
      ...commerceItemToMedia(item),
      id: item.id,
      title: item.alt || `Commerce work ${String(index + 1).padStart(2, "0")}`,
      tag: "电商产品视觉",
      text: "",
      index,
      moduleId: commerceModule.id,
      moduleTitle: commerceModule.title,
    }));
  }

  return commerceModule.works.map((work, index) => ({
    ...work,
    id: `project-${String(index + 1).padStart(2, "0")}`,
    index,
    moduleId: commerceModule.id,
    moduleTitle: commerceModule.title,
  }));
}

function parseProjectRoute(rawRoute) {
  const cleanRoute = rawRoute.split("?")[0].replace(/\/$/, "");
  const match = cleanRoute.match(/^\/?work\/commerce\/(project-\d{2})$/);
  return match?.[1] || null;
}

function getRouteState() {
  const pathnameRoute = window.location.pathname || "";
  const edit = new URLSearchParams(window.location.search || "").get("edit") === "1";
  const commerceProjectId = parseProjectRoute(pathnameRoute);
  const pathModuleMatch = pathnameRoute.replace(/\/$/, "").match(/^\/work\/([^/]+)$/);
  const pathModuleId = pathModuleMatch?.[1] || null;
  const moduleId = commerceProjectId
    ? "commerce"
    : portfolioModules.some((module) => module.id === pathModuleId) ? pathModuleId : null;
  const page = pathnameRoute.replace(/\/$/, "") === "/work" ? "work" : "home";

  return { moduleId, commerceProjectId, edit, page };
}

function App() {
  const [routeState, setRouteState] = useState(() => getRouteState());
  const [lastWorkModuleId, setLastWorkModuleId] = useState(() => {
    const savedId = localStorage.getItem("lastWorkModuleId");
    return portfolioModules.some((module) => module.id === savedId) ? savedId : portfolioModules[0]?.id;
  });
  const activeModuleId = routeState.moduleId;
  const activeModule = portfolioModules.find((item) => item.id === activeModuleId);
  const commerceProjects = getCommerceProjects();
  const activeCommerceProject = routeState.commerceProjectId
    ? commerceProjects.find((project) => project.id === routeState.commerceProjectId)
    : null;

  const openModulePage = (id) => {
    setLastWorkModuleId(id);
    setRouteState({ moduleId: id, commerceProjectId: null, edit: false, page: "work" });
    window.history.pushState(null, "", `/work/${id}`);
  };

  const openCommerceProject = (projectId) => {
    setLastWorkModuleId("commerce");
    const route = String(projectId || "");
    const targetUrl = route.startsWith("/") ? route : `${commerceDetailBasePath}/${route}`;
    const nextProjectId = parseProjectRoute(targetUrl) || route.replace(/^.*\//, "");
    setRouteState({ moduleId: "commerce", commerceProjectId: nextProjectId, edit: false, page: "work" });
    window.history.pushState(null, "", targetUrl);
  };

  const closeModulePage = () => {
    setRouteState({ moduleId: null, commerceProjectId: null, edit: false, page: "work" });
    window.history.pushState(null, "", "/work");
    requestAnimationFrame(() => {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  useEffect(() => {
    if (window.location.hash.startsWith("#/work") || window.location.hash.startsWith("#work")) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const nextRouteState = getRouteState();
      if (nextRouteState.moduleId) {
        setLastWorkModuleId(nextRouteState.moduleId);
      }
      setRouteState(nextRouteState);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (activeModule || routeState.commerceProjectId) return;
    requestAnimationFrame(() => {
      if (routeState.page === "work") {
        document.getElementById("work")?.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }, [activeModule, routeState.commerceProjectId, routeState.page]);

  useEffect(() => {
    if (lastWorkModuleId) {
      localStorage.setItem("lastWorkModuleId", lastWorkModuleId);
    }
  }, [lastWorkModuleId]);

  if (routeState.commerceProjectId) {
    return (
      <CommerceProjectDetail
        project={activeCommerceProject}
        edit={routeState.edit}
        onBack={() => openModulePage("commerce")}
      />
    );
  }

  if (activeModule) {
    return <ProjectModulePage module={activeModule} onBack={closeModulePage} onOpenCommerceProject={openCommerceProject} />;
  }

  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Experience />
        <Projects
          onOpenModule={openModulePage}
          initialModuleId={lastWorkModuleId}
          onActiveModuleChange={setLastWorkModuleId}
        />
        <Strengths />
        <ContactEnd />
      </main>
    </>
  );
}

const defaultVideoSettings = {
  x: 36,
  y: 48,
  scale: 1.18,
  opacity: 0.82,
  brightness: 0.84,
  contrast: 1.08,
  saturation: 1.08,
};

const defaultModuleImageSettings = {
  x: 50,
  y: 50,
  scale: 1,
};

function SiteNav() {
  const navRef = useRef<HTMLElement | null>(null);
  const navRafRef = useRef<number | null>(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "about", "work", "strength", "contact"];
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 28);

      const current = sections.reduce((closest, sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return closest;
        const distance = Math.abs(section.getBoundingClientRect().top - 120);
        return distance < closest.distance ? { id: sectionId, distance } : closest;
      }, { id: "home", distance: Number.POSITIVE_INFINITY });

      setActiveSection(current.id);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (navRafRef.current) {
        window.cancelAnimationFrame(navRafRef.current);
      }
    };
  }, []);

  const handleNavPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const node = navRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;

    if (navRafRef.current) {
      window.cancelAnimationFrame(navRafRef.current);
    }

    navRafRef.current = window.requestAnimationFrame(() => {
      node.style.setProperty("--nav-glow-x", `${x}px`);
      node.style.setProperty("--nav-glow-opacity", "1");
    });
  };

  const handleNavPointerLeave = () => {
    navRef.current?.style.setProperty("--nav-glow-opacity", "0");
  };

  const navigateSection = (event, sectionId) => {
    event.preventDefault();
    const nextPath = sectionId === "work" ? "/work" : "/home";
    window.history.pushState(null, "", nextPath);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      ref={navRef}
      className={`site-header nav${navScrolled ? " is-scrolled" : ""}`}
      onPointerMove={handleNavPointerMove}
      onPointerLeave={handleNavPointerLeave}
    >
      <a className="brand" href="/home" onClick={(event) => navigateSection(event, "home")}>
        <span className="brand-mark" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="auto">
            <source src="/logo-mark.webm" type="video/webm" />
          </video>
        </span>
        <strong>[PORTFOLIO]</strong>
      </a>
      <div className="nav-links">
        <a className={activeSection === "about" ? "is-current" : ""} href="/home" onClick={(event) => navigateSection(event, "about")}>[EXPERIENCE]</a>
        <a className={activeSection === "work" ? "is-current" : ""} href="/work" onClick={(event) => navigateSection(event, "work")}>[PROJECTS]</a>
        <a className={activeSection === "strength" ? "is-current" : ""} href="/home" onClick={(event) => navigateSection(event, "strength")}>[SKILLS]</a>
      </div>
      <a className="nav-contact" href={`mailto:${contact.email}`}>
        <Mail size={15} />
        <span>[CONTACT]</span>
      </a>
    </nav>
  );
}

function Hero() {
  const [videoSettings, setVideoSettings] = useState(() => {
    try {
      return {
        ...defaultVideoSettings,
        ...JSON.parse(localStorage.getItem("heroVideoSettings") || "{}"),
      };
    } catch {
      return defaultVideoSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem("heroVideoSettings", JSON.stringify(videoSettings));
  }, [videoSettings]);

  const updateVideoSetting = (key, value) => {
    setVideoSettings((current) => ({ ...current, [key]: Number(value) }));
  };

  const videoStyle = {
    objectPosition: `${videoSettings.x}% ${videoSettings.y}%`,
    opacity: videoSettings.opacity,
    filter: `saturate(${videoSettings.saturation}) contrast(${videoSettings.contrast}) brightness(${videoSettings.brightness})`,
    transform: `scale(${videoSettings.scale})`,
    transformOrigin: `${videoSettings.x}% ${videoSettings.y}%`,
  };

  return (
    <section className="hero" id="home">
      <div className="hero-video-frame" aria-hidden="true">
        <video className="hero-video" style={videoStyle} autoPlay muted loop playsInline poster="/hero-poster.svg" onLoadedMetadata={(event) => { event.currentTarget.playbackRate = 0.7; }}>
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-figure" aria-hidden="true">
        <img src="/hero-render-figure.svg" alt="" />
      </div>

      <div className="hero-index-word" aria-hidden="true">RENDER</div>
      <div className="container hero-content hero-index-layout">
        <p className="hero-microcopy">
          I build clear visual systems for products, commerce, and motion content.
        </p>

        <div className="hero-statement">
          <span>LH</span>
          <h1>
            Visual design is not decoration.
            <br />
            It is product direction.
          </h1>
        </div>
      </div>
      <VideoTuningPanel settings={videoSettings} onChange={updateVideoSetting} />
    </section>
  );
}
function VideoTuningPanel({ settings, onChange }) {
  const [collapsed, setCollapsed] = useState(true);
  const controls = [
    { key: "x", label: "水平位置", min: 0, max: 100, step: 1, suffix: "%" },
    { key: "y", label: "垂直位置", min: 0, max: 100, step: 1, suffix: "%" },
    { key: "scale", label: "缩放", min: 1, max: 2.4, step: 0.01, suffix: "x" },
    { key: "opacity", label: "透明度", min: 0.2, max: 1, step: 0.01, suffix: "" },
    { key: "brightness", label: "亮度", min: 0.45, max: 1.3, step: 0.01, suffix: "" },
    { key: "contrast", label: "对比度", min: 0.7, max: 1.6, step: 0.01, suffix: "" },
    { key: "saturation", label: "饱和度", min: 0, max: 1.8, step: 0.01, suffix: "" },
  ];

  const cssText = `object-position: ${settings.x}% ${settings.y}%; transform: scale(${settings.scale}); opacity: ${settings.opacity}; filter: saturate(${settings.saturation}) contrast(${settings.contrast}) brightness(${settings.brightness});`;

  if (collapsed) {
    return (
      <button className="video-tuning-toggle" type="button" onClick={() => setCollapsed(false)}>
        视频控制台
      </button>
    );
  }

  return (
    <aside className="video-tuning-panel" aria-label="背景视频调整控制台">
      <div className="video-tuning-header">
        <div className="video-tuning-title">背景视频控制台</div>
        <button className="video-collapse" type="button" onClick={() => setCollapsed(true)}>收起</button>
      </div>
      {controls.map((control) => (
        <label className="video-control" key={control.key}>
          <span>
            {control.label}
            <strong>{settings[control.key]}{control.suffix}</strong>
          </span>
          <input
            type="range"
            min={control.min}
            max={control.max}
            step={control.step}
            value={settings[control.key]}
            onChange={(event) => onChange(control.key, event.target.value)}
          />
        </label>
      ))}
      <button
        className="video-reset"
        type="button"
        onClick={() => controls.forEach((control) => onChange(control.key, defaultVideoSettings[control.key]))}
      >
        重置
      </button>
      <code>{cssText}</code>
    </aside>
  );
}

function Experience() {
  return (
    <section className="section about" id="about">
      <div className="container about-layout">
        <div className="portrait-panel profile-lanyard-panel">
          <div className="profile-lanyard" aria-label="可拖动的互动工牌">
          <Lanyard
            position={[0, 0, 25]}
            gravity={[0, -38, 0]}
            fov={20}
            transparent
            frontImage="/assets/lanyard/work-card-front.png"
            backImage="/assets/lanyard/work-card-front.png"
            imageFit="contain"
            lanyardWidth={1.18}
            cardScale={2.52}
          />
          </div>
        </div>
        <div className="about-copy">
          <span className="section-kicker">个人经历</span>
          <h2>视觉设计、AI 美术创作与三维产品内容的复合型执行者。</h2>
          <p>
            毕业于广州华立科技职业学院动漫制作技术专业，具备从 AI 概念设计、产品商业渲染、
            页面视觉优化到短视频内容产出的完整执行能力。曾在深圳市和承有限公司负责亚马逊、
            淘宝、TikTok、Instagram 与独立站等平台视觉内容搭建，覆盖产品主副图、详情页、
            动态动画和社媒素材。
          </p>
          <div className="timeline">
            <div>
              <time>2025.5 - 2026.5</time>
              <strong>深圳市和承有限公司 / 产品渲染师</strong>
              <p>负责多平台电商视觉、产品动态动画、独立站页面优化与短视频内容制作。</p>
            </div>
            <div>
              <time>2023.9 - 2026.6</time>
              <strong>广州华立科技职业学院 / 动漫制作技术</strong>
              <p>熟悉 Photoshop、After Effects、Premiere Pro、Cinema 4D、Octane 等工具。</p>
            </div>
          </div>
          <div className="contact-strip">
            <span>
              <Phone size={16} />
              {contact.phone}
            </span>
            <span>
              <Mail size={16} />
              {contact.email}
            </span>
            <span>
              <MapPin size={16} />
              {contact.location}
            </span>
          </div>
          <div className="stats-grid">
            {stats.map((item) => (
              <div className="stat-card" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ onOpenModule, initialModuleId, onActiveModuleChange }) {
  const [imagePanelOpen, setImagePanelOpen] = useState(false);
  const initialModuleIndex = Math.max(0, portfolioModules.findIndex((module) => module.id === initialModuleId));
  const [activeModuleIndex, setActiveModuleIndex] = useState(initialModuleIndex);
  const [imageSettings, setImageSettings] = useState(() => {
    try {
      const savedSettings = JSON.parse(localStorage.getItem("moduleImageSettings") || "{}");
      if ("x" in savedSettings || "y" in savedSettings || "scale" in savedSettings) {
        return {};
      }
      return savedSettings;
    } catch {
      return {};
    }
  });
  const [selectedModuleId, setSelectedModuleId] = useState(portfolioModules[initialModuleIndex]?.id || portfolioModules[0]?.id || "");
  const [openingModuleId, setOpeningModuleId] = useState(null);
  const coverflowRef = useRef<HTMLDivElement | null>(null);
  const activeModuleIndexRef = useRef(0);
  const wheelDeltaRef = useRef(0);
  const wheelDirectionRef = useRef(0);
  const wheelLockedUntilRef = useRef(0);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const pointerMovedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const openTimerRef = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem("moduleImageSettings", JSON.stringify(imageSettings));
  }, [imageSettings]);

  useEffect(() => () => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
    }
  }, []);

  activeModuleIndexRef.current = activeModuleIndex;

  const selectedImageSettings = {
    ...defaultModuleImageSettings,
    ...(imageSettings[selectedModuleId] || {}),
  };

  const getModuleImageSettings = (moduleId) => ({
    ...defaultModuleImageSettings,
    ...(imageSettings[moduleId] || {}),
  });

  const updateImageSetting = (key, value) => {
    setImageSettings((current) => ({
      ...current,
      [selectedModuleId]: {
        ...defaultModuleImageSettings,
        ...(current[selectedModuleId] || {}),
        [key]: Number(value),
      },
    }));
  };

  const resetSelectedImageSetting = () => {
    setImageSettings((current) => ({
      ...current,
      [selectedModuleId]: defaultModuleImageSettings,
    }));
  };

  const getModuleMediaStyle = (moduleId) => {
    const settings = getModuleImageSettings(moduleId);
    return {
      objectPosition: `${settings.x}% ${settings.y}%`,
      transform: `scale(${settings.scale})`,
      transformOrigin: `${settings.x}% ${settings.y}%`,
    };
  };

  const isCoverflowInMainView = () => {
    const node = coverflowRef.current;
    if (!node) return false;
    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.bottom > viewportHeight * 0.18 && rect.top < viewportHeight * 0.82;
  };

  const isWheelLocked = () => performance.now() < wheelLockedUntilRef.current;

  const lockWheel = () => {
    wheelLockedUntilRef.current = performance.now() + 620;
  };

  const getCircularOffset = (index, currentIndex = activeModuleIndexRef.current) => {
    const total = portfolioModules.length;
    let offset = index - currentIndex;
    if (offset >= total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  const shiftCoverflow = (direction) => {
    if (isWheelLocked() || openingModuleId) return false;
    const currentIndex = activeModuleIndexRef.current;
    const nextIndex = (currentIndex + direction + portfolioModules.length) % portfolioModules.length;
    if (nextIndex === currentIndex) return false;
    lockWheel();
    wheelDeltaRef.current = 0;
    wheelDirectionRef.current = 0;
    activeModuleIndexRef.current = nextIndex;
    setActiveModuleIndex(nextIndex);
    setSelectedModuleId(portfolioModules[nextIndex].id);
    onActiveModuleChange?.(portfolioModules[nextIndex].id);
    return true;
  };

  const selectCoverflowIndex = (index) => {
    if (isWheelLocked() || openingModuleId || index === activeModuleIndexRef.current) return false;
    lockWheel();
    wheelDeltaRef.current = 0;
    wheelDirectionRef.current = 0;
    activeModuleIndexRef.current = index;
    setActiveModuleIndex(index);
    setSelectedModuleId(portfolioModules[index].id);
    onActiveModuleChange?.(portfolioModules[index].id);
    return true;
  };

  const preloadModuleCover = (module) => {
    const cover = getModuleCoverItem(module);
    if (cover.media === "video") return;
    const image = new Image();
    image.src = cover.src;
  };

  const beginModuleOpen = (module) => {
    if (openingModuleId) return;
    preloadModuleCover(module);
    onActiveModuleChange?.(module.id);
    setOpeningModuleId(module.id);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = prefersReducedMotion ? routeTransition.reducedExitMs : routeTransition.exitMs;
    openTimerRef.current = window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
      onOpenModule(module.id);
    }, delay);
  };

  const handleCoverflowWheel = (event) => {
    if (openingModuleId) {
      event.preventDefault();
      return;
    }

    const direction = event.deltaY > 0 ? 1 : -1;
    const isVisible = isCoverflowInMainView();

    if (!event.deltaY || !isVisible) {
      return;
    }

    event.preventDefault();

    if (isWheelLocked()) {
      wheelDeltaRef.current = 0;
      wheelDirectionRef.current = 0;
      return;
    }

    if (wheelDirectionRef.current && wheelDirectionRef.current !== direction) {
      wheelDeltaRef.current = 0;
    }

    wheelDirectionRef.current = direction;
    wheelDeltaRef.current += event.deltaY;

    if (Math.abs(wheelDeltaRef.current) >= 84) {
      shiftCoverflow(direction);
    }
  };

  const handleCoverflowKeyDown = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const moved = shiftCoverflow(event.key === "ArrowRight" ? 1 : -1);
    if (moved) event.preventDefault();
  };

  const handlePointerDown = (event) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    pointerMovedRef.current = false;
    suppressClickRef.current = false;
  };

  const handlePointerMove = (event) => {
    if (!pointerStartRef.current) return;
    const distanceX = event.clientX - pointerStartRef.current.x;
    const distanceY = event.clientY - pointerStartRef.current.y;
    if (Math.abs(distanceX) > 8 || Math.abs(distanceY) > 8) {
      pointerMovedRef.current = true;
    }
  };

  const handlePointerUp = (event) => {
    if (!pointerStartRef.current) return;
    const distanceX = event.clientX - pointerStartRef.current.x;
    const distanceY = event.clientY - pointerStartRef.current.y;
    pointerStartRef.current = null;

    if (Math.abs(distanceX) > 64 && Math.abs(distanceX) > Math.abs(distanceY) * 1.25) {
      suppressClickRef.current = shiftCoverflow(distanceX < 0 ? 1 : -1);
      return;
    }

    suppressClickRef.current = false;
  };

  const handlePointerCancel = (event) => {
    pointerStartRef.current = null;
    pointerMovedRef.current = false;
    suppressClickRef.current = false;
  };

  const handleSelectModule = (moduleId) => {
    const nextIndex = portfolioModules.findIndex((module) => module.id === moduleId);
    setSelectedModuleId(moduleId);
    if (nextIndex >= 0) {
      activeModuleIndexRef.current = nextIndex;
      setActiveModuleIndex(nextIndex);
      onActiveModuleChange?.(moduleId);
    }
  };

  useEffect(() => {
    const node = coverflowRef.current;
    if (!node) return undefined;
    node.addEventListener("wheel", handleCoverflowWheel, { passive: false });
    return () => {
      node.removeEventListener("wheel", handleCoverflowWheel);
    };
  });

  return (
    <section className={`section projects${openingModuleId ? " is-route-exiting" : ""}`} id="work">
      <div className="container">
        <div className="section-head projects-head">
          <span className="section-kicker">Selected Works</span>
          <h2>以产品渲染、动态影像和电商视觉组织的作品索引。</h2>
        </div>

        <div
          className={`coverflow-shell${openingModuleId ? " is-opening" : ""}`}
          ref={coverflowRef}
          role="region"
          aria-label="作品 Coverflow 轮播，使用鼠标滚轮、拖拽或左右方向键切换"
          tabIndex={0}
          onKeyDown={handleCoverflowKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <div className="coverflow-track" aria-label="作品大模块目录">
          {portfolioModules.map((module, index) => (
            (() => {
              const offset = getCircularOffset(index, activeModuleIndex);
              const absOffset = Math.abs(offset);
              const cardStyle = {
                transform: `translate3d(calc(-50% + ${offset * 360}px), -50%, ${absOffset * -150}px) rotateY(${offset * -14}deg) scale(${Math.max(0.68, 1 - absOffset * 0.1)})`,
                opacity: Math.max(0.18, 1 - absOffset * 0.16),
                zIndex: portfolioModules.length - absOffset,
                pointerEvents: absOffset > 3 ? "none" as const : "auto" as const,
              };

              return (
            <button
              className={`coverflow-card${index === activeModuleIndex ? " is-active" : ""}${openingModuleId === module.id ? " is-opening-target" : ""}${imagePanelOpen && module.id === selectedModuleId ? " tuning-selected" : ""}`}
              type="button"
              key={module.id}
              data-index={index}
              style={cardStyle}
              aria-current={index === activeModuleIndex ? "true" : undefined}
              aria-label={`${module.title}，点击进入项目页面`}
              onClick={() => {
                if (suppressClickRef.current) {
                  suppressClickRef.current = false;
                  return;
                }
                const currentIndex = activeModuleIndexRef.current;
                if (index === currentIndex) {
                  beginModuleOpen(module);
                  return;
                }
                shiftCoverflow(getCircularOffset(index, currentIndex) > 0 ? 1 : -1);
              }}
            >
              <PortfolioMedia item={{ ...getModuleCoverItem(module), title: module.title, playPreview: false }} preview style={getModuleMediaStyle(module.id)} />
              {imagePanelOpen && module.id === selectedModuleId && <span className="module-tuning-badge">正在调整</span>}
              <div className="module-card-copy coverflow-card-copy">
                <span>{module.tag}</span>
                <h3>{module.title}</h3>
                <p>{module.desc}</p>
                <div>
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                  <em>{module.meta}</em>
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </button>
              );
            })()
          ))}
          </div>
          <div className="coverflow-status" aria-hidden="true">
            <span>{String(activeModuleIndex + 1).padStart(2, "0")}</span>
            <strong>{portfolioModules[activeModuleIndex].title}</strong>
            <em>{portfolioModules[activeModuleIndex].meta}</em>
          </div>
          {openingModuleId && <div className="route-transition-scrim" aria-hidden="true" />}
        </div>
      </div>
      <ModuleImageTuningPanel
        modules={portfolioModules}
        selectedModuleId={selectedModuleId}
        onSelectModule={handleSelectModule}
        open={imagePanelOpen}
        onOpenChange={setImagePanelOpen}
        settings={selectedImageSettings}
        onChange={updateImageSetting}
        onReset={resetSelectedImageSetting}
      />
    </section>
  );
}

function ModuleImageTuningPanel({ modules, selectedModuleId, onSelectModule, open, onOpenChange, settings, onChange, onReset }) {
  const selectedModule = modules.find((module) => module.id === selectedModuleId) || modules[0];
  const controls = [
    { key: "x", label: "水平位置", min: 0, max: 100, step: 1, suffix: "%" },
    { key: "y", label: "垂直位置", min: 0, max: 100, step: 1, suffix: "%" },
    { key: "scale", label: "图片大小", min: 0.7, max: 1.8, step: 0.01, suffix: "x" },
  ];

  if (!open) {
    return (
      <button className="module-image-tuning-toggle" type="button" onClick={() => onOpenChange(true)}>
        图片控制台
      </button>
    );
  }

  return (
    <aside className="module-image-tuning-panel" aria-label="作品模块图片调整控制台">
      <div className="video-tuning-header">
        <div className="video-tuning-title">作品图片控制台</div>
        <button className="video-collapse" type="button" onClick={() => onOpenChange(false)}>收起</button>
      </div>
      <div className="module-image-current">
        <span>当前调整</span>
        <strong>{selectedModule?.title}</strong>
      </div>
      <label className="module-image-select">
        <span>选择图片</span>
        <select value={selectedModuleId} onChange={(event) => onSelectModule(event.target.value)}>
          {modules.map((module) => (
            <option value={module.id} key={module.id}>
              {module.title}
            </option>
          ))}
        </select>
      </label>
      {controls.map((control) => (
        <label className="video-control" key={control.key}>
          <span>
            {control.label}
            <strong>{settings[control.key]}{control.suffix}</strong>
          </span>
          <input
            type="range"
            min={control.min}
            max={control.max}
            step={control.step}
            value={settings[control.key]}
            onChange={(event) => onChange(control.key, event.target.value)}
          />
        </label>
      ))}
      <button
        className="video-reset"
        type="button"
        onClick={onReset}
      >
        重置当前图片
      </button>
    </aside>
  );
}

function PortfolioMedia({ item, preview = false, style = undefined }) {
  const label = item.title || item.original || "portfolio media";

  if (item.media === "video") {
    const shouldAutoPreview = preview && item.playPreview !== false;
    return (
      <video className="portfolio-media" style={style} controls={!preview} autoPlay={shouldAutoPreview} loop={shouldAutoPreview} muted playsInline preload="metadata">
        <source src={item.src} type="video/mp4" />
      </video>
    );
  }

  return <img className="portfolio-media" style={style} src={item.src} alt={label} loading="lazy" />;
}

const COMMERCE_MODEL_URL = "/models/commerce/switch-controller-pbr-v2.glb";
const COMMERCE_MODEL_INITIAL_ROTATION: [number, number, number] = [0, 0, 0];

function getCommerceProjectId(module, item) {
  const index = module.works.findIndex((work) => work.src === item.src);
  return `project-${String(Math.max(index, 0) + 1).padStart(2, "0")}`;
}

function CommerceIntroPanel() {
  return (
    <div className="commerce-intro-panel">
      <span>E-COMMERCE VISUAL</span>
      <h3>产品三维视觉展示</h3>
      <p>
        围绕产品结构、材质与使用场景，建立统一的电商主图、卖点图和动态展示系统。
      </p>
    </div>
  );
}

function CommerceModelAsset({ modelUrl, onReady }) {
  const { scene } = useGLTF(modelUrl) as any;

  useEffect(() => {
    onReady();
  }, [onReady, scene]);

  return (
    <group rotation={COMMERCE_MODEL_INITIAL_ROTATION}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(COMMERCE_MODEL_URL);

function CommerceModelScene({ modelUrl, onReady }) {
  return (
    <>
      <color attach="background" args={["#090b0d"]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 5, 6]} intensity={2.5} />
      <directionalLight position={[-4, 2, -3]} intensity={1.2} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2}>
          <Center precise>
            <CommerceModelAsset modelUrl={modelUrl} onReady={onReady} />
          </Center>
        </Bounds>
      </Suspense>
    </>
  );
}

function CommerceModelViewer({ modelUrl, posterSrc }) {
  const [isReady, setIsReady] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const resumeTimerRef = useRef<number | null>(null);
  const handleModelReady = useCallback(() => setIsReady(true), []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) setAutoRotate(false);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const pauseAutoRotate = useCallback(() => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    setAutoRotate(false);
    setHasInteracted(true);
  }, []);

  const resumeAutoRotateLater = useCallback(() => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      resumeTimerRef.current = window.setTimeout(() => setAutoRotate(true), 4000);
    }
  }, []);

  return (
    <div className={`commerce-model-viewer${isReady ? " is-ready" : ""}`}>
      <Canvas
        className="commerce-model-canvas"
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 6], fov: 35, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <CommerceModelScene
          modelUrl={modelUrl}
          onReady={handleModelReady}
        />
        <OrbitControls
          makeDefault
          enableRotate={true}
          enableZoom={true}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.35}
          minPolarAngle={Math.PI * 0.1}
          maxPolarAngle={Math.PI * 0.9}
          onStart={pauseAutoRotate}
          onEnd={resumeAutoRotateLater}
        />
      </Canvas>
      <div className="commerce-model-poster" aria-hidden={isReady}>
        <img src={posterSrc} alt="" />
        <span>LOADING 3D MODEL</span>
        <i />
      </div>
      <span className={`commerce-model-hint${hasInteracted ? " is-hidden" : ""}`}>DRAG TO ROTATE · SCROLL TO ZOOM</span>
    </div>
  );
}

function CommerceShowcase({ module }) {
  const coverItem = getModuleCoverItem(module);

  return (
    <div className="commerce-showcase">
      <div className="commerce-showcase-main">
        <CommerceIntroPanel />
        <CommerceModelViewer modelUrl={COMMERCE_MODEL_URL} posterSrc={coverItem.src} />
      </div>
    </div>
  );
}

function normalizeCommerceGroups(groups) {
  if (!Array.isArray(groups)) return { groups: [] };

  return {
    groups: groups.map((group, groupIndex) => ({
      id: group.id || `group-${String(groupIndex + 1).padStart(2, "0")}`,
      name: group.name || `第${groupIndex + 1}组`,
      defaultActiveIndex: Number.isFinite(Number(group.defaultActiveIndex)) ? Number(group.defaultActiveIndex) : 0,
      items: Array.isArray(group.items) ? group.items.map((item, itemIndex) => {
        const projectNumber = String(groupIndex * 6 + itemIndex + 1).padStart(2, "0");
        return {
          id: item.id || `project-${projectNumber}`,
          image: item.image || item.src || "",
          detailUrl: item.detailUrl || `${commerceDetailBasePath}/project-${projectNumber}`,
          alt: item.alt || item.title || `电商产品视觉 ${projectNumber}`,
          objectFit: item.objectFit === "contain" ? "contain" : "cover",
          objectPositionX: Number.isFinite(Number(item.objectPositionX)) ? Number(item.objectPositionX) : 50,
          objectPositionY: Number.isFinite(Number(item.objectPositionY)) ? Number(item.objectPositionY) : 50,
        };
      }) : [],
    })),
  };
}

function createCommerceGroupsFromModule(module) {
  const groupSize = 6;
  const groups = [];

  for (let index = 0; index < module.works.length; index += groupSize) {
    const slice = module.works.slice(index, index + groupSize);
    groups.push({
      id: `group-${String(groups.length + 1).padStart(2, "0")}`,
      name: `${String(index + 1).padStart(2, "0")}-${String(index + slice.length).padStart(2, "0")}`,
      defaultActiveIndex: 0,
      items: slice.map((work, itemIndex) => {
        const absoluteIndex = index + itemIndex + 1;
        const projectId = `project-${String(absoluteIndex).padStart(2, "0")}`;
        return {
          id: projectId,
          image: work.src,
          detailUrl: `${commerceDetailBasePath}/${projectId}`,
          alt: work.title || `电商产品视觉 ${absoluteIndex}`,
          objectFit: "cover",
          objectPositionX: 50,
          objectPositionY: 50,
        };
      }),
    });
  }

  return { groups };
}

function countCommerceWorks(groups) {
  return groups.reduce((sum, group) => sum + group.items.length, 0);
}

function commerceItemToMedia(item) {
  return {
    title: item.alt,
    tag: "电商产品视觉",
    src: item.image,
    media: "image",
    size: "",
    original: item.image.split("/").pop() || item.id,
  };
}

function CommerceWorkRow({ group, onOpenProject }) {
  const safeActiveIndex = Math.min(Math.max(Number(group.defaultActiveIndex) || 0, 0), Math.max(group.items.length - 1, 0));
  const [activeWorkIndex, setActiveWorkIndex] = useState(safeActiveIndex);

  useEffect(() => {
    setActiveWorkIndex(safeActiveIndex);
  }, [group.id, safeActiveIndex]);

  const handlePanelClick = (index) => {
    const item = group.items[index];
    if (!item) return;
    onOpenProject(item.detailUrl || `${commerceDetailBasePath}/${item.id}`);
  };

  return (
    <div className="commerce-works-accordion" data-count={group.items.length}>
      {group.items.map((item, index) => {
        const isActive = index === activeWorkIndex;
        const mediaItem = commerceItemToMedia(item);

        return (
          <button
            className={`commerce-work-panel${isActive ? " commerce-work-panel--active" : ""}`}
            type="button"
            key={item.id}
            onMouseEnter={() => setActiveWorkIndex(index)}
            onFocus={() => setActiveWorkIndex(index)}
            onClick={() => handlePanelClick(index)}
            aria-label={`打开${item.alt || item.id}`}
            aria-expanded={isActive}
          >
            <PortfolioMedia
              item={mediaItem}
              preview
              style={{
                objectFit: item.objectFit,
                objectPosition: `${item.objectPositionX}% ${item.objectPositionY}%`,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

function CommerceWorksAccordion({ groups, onOpenProject }) {
  return (
    <div className="commerce-works-wrap" aria-label="电商产品视觉作品列表">
      {groups.map((group, groupIndex) => (
        <CommerceWorkRow
          key={group.id || `commerce-row-${groupIndex}`}
          group={group}
          onOpenProject={onOpenProject}
        />
      ))}
    </div>
  );
}

function createEmptyCommerceItem(index = 1) {
  const projectId = `project-${String(index).padStart(2, "0")}`;
  return {
    id: projectId,
    image: "",
    detailUrl: `${commerceDetailBasePath}/${projectId}`,
    alt: `电商产品视觉 ${String(index).padStart(2, "0")}`,
    objectFit: "cover",
    objectPositionX: 50,
    objectPositionY: 50,
  };
}

function cloneCommerceGroups(groups) {
  return normalizeCommerceGroups(groups).groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({ ...item })),
  }));
}

function CommerceWorksEditor({
  groups,
  onChange,
  onSave,
  onClose,
  onReset,
  dirty,
  saving,
}) {
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id || "");
  const selectedGroupIndex = Math.max(0, groups.findIndex((group) => group.id === selectedGroupId));
  const selectedGroup = groups[selectedGroupIndex] || groups[0];

  useEffect(() => {
    if (!groups.some((group) => group.id === selectedGroupId)) {
      setSelectedGroupId(groups[0]?.id || "");
    }
  }, [groups, selectedGroupId]);

  const replaceGroups = (nextGroups) => onChange(cloneCommerceGroups(nextGroups));

  const updateGroup = (patch) => {
    replaceGroups(groups.map((group, index) => index === selectedGroupIndex ? { ...group, ...patch } : group));
  };

  const updateItem = (itemIndex, patch) => {
    updateGroup({
      items: selectedGroup.items.map((item, index) => index === itemIndex ? { ...item, ...patch } : item),
    });
  };

  const moveGroup = (direction) => {
    const targetIndex = selectedGroupIndex + direction;
    if (targetIndex < 0 || targetIndex >= groups.length) return;
    const nextGroups = [...groups];
    [nextGroups[selectedGroupIndex], nextGroups[targetIndex]] = [nextGroups[targetIndex], nextGroups[selectedGroupIndex]];
    replaceGroups(nextGroups);
  };

  const moveItem = (itemIndex, direction) => {
    const targetIndex = itemIndex + direction;
    if (!selectedGroup || targetIndex < 0 || targetIndex >= selectedGroup.items.length) return;
    const nextItems = [...selectedGroup.items];
    [nextItems[itemIndex], nextItems[targetIndex]] = [nextItems[targetIndex], nextItems[itemIndex]];
    updateGroup({ items: nextItems });
  };

  const addGroup = () => {
    const nextIndex = groups.length + 1;
    const startIndex = countCommerceWorks(groups) + 1;
    const nextGroup = {
      id: `group-${Date.now()}`,
      name: `第${nextIndex}组`,
      defaultActiveIndex: 0,
      items: Array.from({ length: 1 }, (_, index) => createEmptyCommerceItem(startIndex + index)),
    };
    replaceGroups([...groups, nextGroup]);
    setSelectedGroupId(nextGroup.id);
  };

  const copyGroup = () => {
    if (!selectedGroup) return;
    const nextGroup = {
      ...selectedGroup,
      id: `group-${Date.now()}`,
      name: `${selectedGroup.name} 副本`,
      items: selectedGroup.items.map((item, index) => ({
        ...item,
        id: `${item.id}-copy-${index + 1}-${Date.now()}`,
      })),
    };
    replaceGroups([...groups, nextGroup]);
    setSelectedGroupId(nextGroup.id);
  };

  const deleteGroup = () => {
    if (!selectedGroup || !window.confirm(`确定删除 ${selectedGroup.name} 吗？`)) return;
    replaceGroups(groups.filter((group) => group.id !== selectedGroup.id));
  };

  const addItem = () => {
    if (!selectedGroup) return;
    const nextIndex = countCommerceWorks(groups) + 1;
    updateGroup({ items: [...selectedGroup.items, createEmptyCommerceItem(nextIndex)] });
  };

  const deleteItem = (itemIndex) => {
    if (!selectedGroup || !window.confirm("确定删除这张作品图片吗？")) return;
    const nextItems = selectedGroup.items.filter((_, index) => index !== itemIndex);
    updateGroup({
      items: nextItems,
      defaultActiveIndex: Math.min(selectedGroup.defaultActiveIndex, Math.max(nextItems.length - 1, 0)),
    });
  };

  const uploadImage = async (file, itemIndex) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) {
      alert("只支持 JPG、PNG、WebP、AVIF 图片。");
      return;
    }
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    updateItem(itemIndex, { image: String(dataUrl), alt: file.name.replace(/\.[^.]+$/, "") });

    try {
      const response = await fetch("/api/commerce-works/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, dataUrl }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "上传失败");
      updateItem(itemIndex, { image: payload.src, alt: file.name.replace(/\.[^.]+$/, "") });
    } catch (error) {
      alert(`图片已临时预览，但上传失败：${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ groups }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "commerceWorks.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file) => {
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = normalizeCommerceGroups(JSON.parse(text).groups);
      if (!parsed.groups.length) throw new Error("JSON 中没有作品组。");
      replaceGroups(parsed.groups);
      setSelectedGroupId(parsed.groups[0].id);
    } catch (error) {
      alert(`导入失败：${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const closeEditor = () => {
    if (dirty && !window.confirm("还有未保存的修改，是否放弃？")) return;
    onClose();
  };

  return (
    <aside className="commerce-works-editor" aria-label="电商作品编辑控制台">
      <div className="commerce-works-editor-head">
        <div>
          <span>LOCAL EDITOR</span>
          <h4>作品图片控制台</h4>
        </div>
        <button type="button" onClick={closeEditor}>关闭</button>
      </div>

      <div className="commerce-editor-section">
        <label>作品组</label>
        <div className="commerce-group-list">
          {groups.map((group, index) => (
            <button
              type="button"
              key={group.id}
              className={group.id === selectedGroup?.id ? "is-active" : ""}
              onClick={() => setSelectedGroupId(group.id)}
            >
              第{index + 1}组 <small>{group.name}</small>
            </button>
          ))}
        </div>
        <div className="commerce-editor-buttons">
          <button type="button" onClick={addGroup}>新增作品组</button>
          <button type="button" onClick={copyGroup} disabled={!selectedGroup}>复制作品组</button>
          <button type="button" onClick={deleteGroup} disabled={!selectedGroup}>删除作品组</button>
          <button type="button" onClick={() => moveGroup(-1)} disabled={selectedGroupIndex <= 0}>上移组</button>
          <button type="button" onClick={() => moveGroup(1)} disabled={selectedGroupIndex >= groups.length - 1}>下移组</button>
        </div>
      </div>

      {selectedGroup && (
        <>
          <div className="commerce-editor-section">
            <label>当前组设置</label>
            <input
              value={selectedGroup.name}
              onChange={(event) => updateGroup({ name: event.target.value })}
              placeholder="组名称"
            />
            <label>默认展开图片</label>
            <input
              type="number"
              min="1"
              max={Math.max(selectedGroup.items.length, 1)}
              value={selectedGroup.defaultActiveIndex + 1}
              onChange={(event) => updateGroup({
                defaultActiveIndex: Math.max(0, Math.min(selectedGroup.items.length - 1, Number(event.target.value) - 1)),
              })}
            />
          </div>

          <div className="commerce-editor-section">
            <div className="commerce-section-row">
              <label>组内图片</label>
              <button type="button" onClick={addItem}>添加图片</button>
            </div>
            <div className="commerce-item-editor-list">
              {selectedGroup.items.map((item, itemIndex) => (
                <div className="commerce-item-editor" key={item.id}>
                  <img src={item.image || "/portfolio-full/commerce/commerce-01.webp"} alt={item.alt} />
                  <div>
                    <strong>{item.alt || item.id}</strong>
                    <input
                      value={item.alt}
                      onChange={(event) => updateItem(itemIndex, { alt: event.target.value })}
                      placeholder="替代文字"
                    />
                    <input
                      value={item.detailUrl}
                      onChange={(event) => updateItem(itemIndex, { detailUrl: event.target.value })}
                      placeholder="/work/commerce/project-01"
                    />
                    <select
                      value={item.objectFit}
                      onChange={(event) => updateItem(itemIndex, { objectFit: event.target.value })}
                    >
                      <option value="cover">cover</option>
                      <option value="contain">contain</option>
                    </select>
                    <label>X {item.objectPositionX}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={item.objectPositionX}
                      onChange={(event) => updateItem(itemIndex, { objectPositionX: Number(event.target.value) })}
                    />
                    <label>Y {item.objectPositionY}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={item.objectPositionY}
                      onChange={(event) => updateItem(itemIndex, { objectPositionY: Number(event.target.value) })}
                    />
                    <div className="commerce-editor-buttons compact">
                      <label className="commerce-upload-button">
                        更换图片
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/avif"
                          onChange={(event) => uploadImage(event.target.files?.[0], itemIndex)}
                        />
                      </label>
                      <button type="button" onClick={() => moveItem(itemIndex, -1)}>左移</button>
                      <button type="button" onClick={() => moveItem(itemIndex, 1)}>右移</button>
                      <button type="button" onClick={() => updateGroup({ defaultActiveIndex: itemIndex })}>默认展开</button>
                      <button type="button" onClick={() => deleteItem(itemIndex)}>删除</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="commerce-editor-actions sticky">
        <button type="button" onClick={onSave} disabled={saving}>{saving ? "保存中..." : "保存"}</button>
        <button type="button" onClick={onReset}>取消修改</button>
        <button type="button" onClick={() => selectedGroup && updateGroup({
          items: selectedGroup.items.map((item) => ({ ...item, objectFit: "cover", objectPositionX: 50, objectPositionY: 50 })),
          defaultActiveIndex: 0,
        })}>重置当前组</button>
        <button type="button" onClick={exportJson}>导出JSON</button>
        <label className="commerce-upload-button">
          导入JSON
          <input type="file" accept="application/json" onChange={(event) => importJson(event.target.files?.[0])} />
        </label>
      </div>
    </aside>
  );
}

function getCommerceProjectStorageKey(projectId) {
  return `commerce-project-detail:${projectId}`;
}

function createDefaultCommerceProjectConfig(project) {
  return {
    id: project.id,
    title: project.title || `电商作品 ${project.id.replace("project-", "")}`,
    images: [
      {
        id: "image-01",
        src: project.src,
        name: project.original || project.src.split("/").pop() || "image",
        x: 0,
        y: 0,
        width: 100,
        scale: 1,
      },
    ],
  };
}

function loadCommerceProjectConfig(project) {
  const fallback = createDefaultCommerceProjectConfig(project);
  try {
    const saved = localStorage.getItem(getCommerceProjectStorageKey(project.id));
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    return {
      ...fallback,
      ...parsed,
      images: Array.isArray(parsed.images) && parsed.images.length ? parsed.images : fallback.images,
    };
  } catch {
    return fallback;
  }
}

function CommerceProjectDetail({ project, edit, onBack }) {
  const [config, setConfig] = useState(() => project ? loadCommerceProjectConfig(project) : null);
  const [draftConfig, setDraftConfig] = useState(config);
  const [selectedImageId, setSelectedImageId] = useState(() => config?.images?.[0]?.id || null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const nextConfig = loadCommerceProjectConfig(project);
    setConfig(nextConfig);
    setDraftConfig(nextConfig);
    setSelectedImageId(nextConfig.images[0]?.id || null);
  }, [project]);

  if (!project || !config || !draftConfig) {
    return (
      <main className="commerce-project-detail">
        <nav className="project-page-nav commerce-detail-nav">
          <button type="button" className="project-logo" onClick={onBack}>
            <span>Z</span>
            <strong>[PORTFOLIO]</strong>
          </button>
        </nav>
        <section className="commerce-detail-404">
          <span>404</span>
          <h1>没有找到这个电商作品。</h1>
          <button type="button" onClick={onBack}>返回电商产品视觉</button>
        </section>
      </main>
    );
  }

  const displayConfig = edit ? draftConfig : config;

  const saveDraft = () => {
    try {
      localStorage.setItem(getCommerceProjectStorageKey(project.id), JSON.stringify(draftConfig));
      setConfig(draftConfig);
    } catch {
      alert("保存失败：图片数据可能太大。请先导出 JSON 备份，或使用较小图片。");
    }
  };

  const cancelDraft = () => {
    setDraftConfig(config);
    setSelectedImageId(config.images[0]?.id || null);
  };

  const resetDraft = () => {
    const nextConfig = createDefaultCommerceProjectConfig(project);
    setDraftConfig(nextConfig);
    setSelectedImageId(nextConfig.images[0]?.id || null);
  };

  return (
    <main className={`commerce-project-detail${edit ? " is-editing" : ""}`}>
      <nav className="project-page-nav commerce-detail-nav">
        <button type="button" className="project-logo" onClick={onBack}>
          <span>Z</span>
          <strong>[PORTFOLIO]</strong>
        </button>
        <div className="project-page-links">
          <button type="button" onClick={onBack}>[COMMERCE]</button>
          <a href={`mailto:${contact.email}`}>[CONTACT]</a>
        </div>
      </nav>

      <section className="commerce-detail-head">
        <div className="container">
          <button className="module-back" type="button" onClick={onBack}>
            返回电商产品视觉
          </button>
          <span>{project.tag || "Commerce Visual"} / {project.id}</span>
          <h1>{displayConfig.title}</h1>
          {!edit && ["localhost", "127.0.0.1"].includes(window.location.hostname) && (
            <a className="commerce-edit-link" href={`${commerceDetailBasePath}/${project.id}?edit=1`}>
              编辑模式
            </a>
          )}
        </div>
      </section>

      <section className="commerce-detail-stage-section">
        <div className="container commerce-detail-layout">
          <div className="commerce-detail-images">
            {displayConfig.images.map((image, index) => (
              <CommerceEditableImage
                key={image.id}
                image={image}
                index={index}
                editable={edit}
                selected={selectedImageId === image.id}
                onSelect={() => setSelectedImageId(image.id)}
                onChange={(nextImage) => {
                  setDraftConfig((current) => ({
                    ...current,
                    images: current.images.map((item) => item.id === image.id ? nextImage : item),
                  }));
                }}
              />
            ))}
          </div>

          {edit && (
            <CommerceProjectEditor
              project={project}
              config={draftConfig}
              selectedImageId={selectedImageId}
              onSelectImage={setSelectedImageId}
              onChange={setDraftConfig}
              onSave={saveDraft}
              onCancel={cancelDraft}
              onReset={resetDraft}
            />
          )}
        </div>
      </section>
    </main>
  );
}

function CommerceEditableImage({ image, index, editable, selected, onSelect, onChange }) {
  const frameRef = useRef(null);
  const interactionRef = useRef(null);

  const clampImage = (nextImage) => ({
    ...nextImage,
    x: Math.max(-78, Math.min(78, Number(nextImage.x) || 0)),
    y: Math.max(-78, Math.min(78, Number(nextImage.y) || 0)),
    width: Math.max(20, Math.min(190, Number(nextImage.width) || 100)),
    scale: Math.max(0.25, Math.min(3, Number(nextImage.scale) || 1)),
  });

  const startDrag = (event) => {
    if (!editable) return;
    event.preventDefault();
    onSelect();
    interactionRef.current = {
      type: event.currentTarget.dataset.action || "move",
      startX: event.clientX,
      startY: event.clientY,
      image,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const moveDrag = (event) => {
    if (!interactionRef.current || !editable) return;
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const deltaX = ((event.clientX - interactionRef.current.startX) / Math.max(rect.width, 1)) * 100;
    const deltaY = ((event.clientY - interactionRef.current.startY) / Math.max(rect.height, 1)) * 100;
    const source = interactionRef.current.image;

    if (interactionRef.current.type === "resize") {
      onChange(clampImage({ ...source, width: source.width + deltaX * 1.7 }));
      return;
    }

    onChange(clampImage({ ...source, x: source.x + deltaX, y: source.y + deltaY }));
  };

  const endDrag = () => {
    interactionRef.current = null;
  };

  return (
    <figure
      className={`commerce-detail-image-frame${editable ? " is-editable" : ""}${selected ? " is-selected" : ""}`}
      ref={frameRef}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClick={onSelect}
    >
      <img
        src={image.src}
        alt={image.name || `commerce project image ${index + 1}`}
        draggable={false}
        onPointerDown={startDrag}
        style={{
          width: `${image.width}%`,
          transform: `translate(${image.x}%, ${image.y}%) scale(${image.scale})`,
        }}
      />
      {editable && (
        <button
          className="commerce-image-resize-handle"
          type="button"
          data-action="resize"
          onPointerDown={startDrag}
          aria-label="调整图片大小"
        />
      )}
    </figure>
  );
}

function CommerceProjectEditor({ project, config, selectedImageId, onSelectImage, onChange, onSave, onCancel, onReset }) {
  const selectedImage = config.images.find((image) => image.id === selectedImageId) || config.images[0];
  const selectedIndex = selectedImage ? config.images.findIndex((image) => image.id === selectedImage.id) : -1;

  const updateSelected = (updates) => {
    if (!selectedImage) return;
    onChange({
      ...config,
      images: config.images.map((image) => image.id === selectedImage.id ? { ...image, ...updates } : image),
    });
  };

  const addFiles = (files: FileList | null | undefined) => {
    Array.from(files || [] as unknown as FileList).forEach((file: File) => {
      if (!file.type.match(/^image\/(jpeg|png|webp)$/)) return;
      const reader = new FileReader();
      reader.onload = () => {
        const nextImage = {
          id: `image-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          src: String(reader.result),
          name: file.name,
          x: 0,
          y: 0,
          width: 100,
          scale: 1,
        };
        onChange((current) => ({ ...current, images: [...current.images, nextImage] }));
        onSelectImage(nextImage.id);
      };
      reader.readAsDataURL(file);
    });
  };

  const moveSelected = (direction) => {
    if (!selectedImage || selectedIndex < 0) return;
    const nextIndex = selectedIndex + direction;
    if (nextIndex < 0 || nextIndex >= config.images.length) return;
    const nextImages = [...config.images];
    [nextImages[selectedIndex], nextImages[nextIndex]] = [nextImages[nextIndex], nextImages[selectedIndex]];
    onChange({ ...config, images: nextImages });
  };

  const deleteSelected = () => {
    if (!selectedImage || config.images.length <= 1) return;
    const nextImages = config.images.filter((image) => image.id !== selectedImage.id);
    onChange({ ...config, images: nextImages });
    onSelectImage(nextImages[Math.max(0, selectedIndex - 1)]?.id || nextImages[0]?.id);
  };

  const exportConfig = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${project.id}-config.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importConfig = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const nextConfig = JSON.parse(String(reader.result));
        if (!Array.isArray(nextConfig.images)) throw new Error("invalid config");
        onChange(nextConfig);
        onSelectImage(nextConfig.images[0]?.id || null);
      } catch {
        alert("导入失败：JSON 格式不正确。");
      }
    };
    reader.readAsText(file);
  };

  return (
    <aside className="commerce-project-editor">
      <div className="commerce-editor-head">
        <strong>详情页编辑控制台</strong>
        <span>{selectedImage?.name || "未选择图片"}</span>
      </div>

      <label>
        更换当前图片
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file || !selectedImage) return;
            const reader = new FileReader();
            reader.onload = () => updateSelected({ src: String(reader.result), name: file.name });
            reader.readAsDataURL(file);
          }}
        />
      </label>

      <label>
        添加图片
        <input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={(event) => addFiles(event.target.files)} />
      </label>

      {selectedImage && (
        <>
          <CommerceEditorRange label="X 轴位置" value={selectedImage.x} min={-78} max={78} step={1} onChange={(value) => updateSelected({ x: value })} />
          <CommerceEditorRange label="Y 轴位置" value={selectedImage.y} min={-78} max={78} step={1} onChange={(value) => updateSelected({ y: value })} />
          <CommerceEditorRange label="宽度" value={selectedImage.width} min={20} max={190} step={1} suffix="%" onChange={(value) => updateSelected({ width: value })} />
          <CommerceEditorRange label="等比例缩放" value={selectedImage.scale} min={0.25} max={3} step={0.05} onChange={(value) => updateSelected({ scale: value })} />

          <div className="commerce-editor-buttons">
            <button type="button" onClick={() => updateSelected({ y: selectedImage.y - 4 })}>上移</button>
            <button type="button" onClick={() => updateSelected({ y: selectedImage.y + 4 })}>下移</button>
            <button type="button" onClick={() => updateSelected({ x: selectedImage.x - 4 })}>左移</button>
            <button type="button" onClick={() => updateSelected({ x: selectedImage.x + 4 })}>右移</button>
            <button type="button" onClick={() => updateSelected({ x: 0, y: 0 })}>居中</button>
            <button type="button" onClick={() => updateSelected({ x: 0, y: 0, width: 100, scale: 1 })}>重置位置</button>
            <button type="button" onClick={() => updateSelected({ scale: selectedImage.scale + 0.1 })}>放大</button>
            <button type="button" onClick={() => updateSelected({ scale: selectedImage.scale - 0.1 })}>缩小</button>
            <button type="button" onClick={() => updateSelected({ width: 100, scale: 1 })}>恢复原始尺寸</button>
            <button type="button" onClick={() => updateSelected({ width: 100, x: 0, y: 0 })}>适应容器</button>
            <button type="button" onClick={() => updateSelected({ width: 100 })}>填满宽度</button>
          </div>

          <div className="commerce-editor-buttons">
            <button type="button" onClick={() => moveSelected(-1)}>向上移动</button>
            <button type="button" onClick={() => moveSelected(1)}>向下移动</button>
            <button type="button" onClick={deleteSelected}>删除图片</button>
          </div>
        </>
      )}

      <select value={selectedImageId || ""} onChange={(event) => onSelectImage(event.target.value)}>
        {config.images.map((image, index) => (
          <option value={image.id} key={image.id}>
            {String(index + 1).padStart(2, "0")} {image.name}
          </option>
        ))}
      </select>

      <div className="commerce-editor-actions">
        <button type="button" onClick={onSave}>保存</button>
        <button type="button" onClick={onCancel}>取消</button>
        <button type="button" onClick={onReset}>重置</button>
        <button type="button" onClick={exportConfig}>导出配置</button>
        <label>
          导入配置
          <input type="file" accept="application/json" onChange={(event) => importConfig(event.target.files?.[0])} />
        </label>
      </div>
    </aside>
  );
}

function CommerceEditorRange({ label, value, min, max, step, suffix = "", onChange }) {
  return (
    <label>
      {label}
      <span>{Number(value).toFixed(step < 1 ? 2 : 0)}{suffix}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <input type="number" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function ProjectModulePage({ module, onBack, onOpenCommerceProject }) {
  const [previewItem, setPreviewItem] = useState(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const isCommerceModule = module.id === "commerce";
  const [commerceGroups, setCommerceGroups] = useState(() => {
    const dataGroups = normalizeCommerceGroups((commerceWorksData as any).groups).groups;
    return dataGroups.length ? dataGroups : createCommerceGroupsFromModule(module).groups;
  });
  const [savedCommerceGroups, setSavedCommerceGroups] = useState(() => cloneCommerceGroups(commerceGroups));
  const [commerceEditorOpen, setCommerceEditorOpen] = useState(() => {
    return isCommerceModule && new URLSearchParams(window.location.search).get("edit") === "1";
  });
  const [commerceSaving, setCommerceSaving] = useState(false);
  const commerceDirty = JSON.stringify(commerceGroups) !== JSON.stringify(savedCommerceGroups);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => {
      titleRef.current?.focus({ preventScroll: true });
    });
  }, [module.id]);

  useEffect(() => {
    if (!isCommerceModule) return;
    let cancelled = false;

    fetch("/api/commerce-works")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("No local API")))
      .then((payload) => {
        if (cancelled) return;
        const nextGroups = normalizeCommerceGroups(payload.groups).groups;
        if (!nextGroups.length) return;
        setCommerceGroups(nextGroups);
        setSavedCommerceGroups(cloneCommerceGroups(nextGroups));
      })
      .catch(() => {
        const fallbackGroups = normalizeCommerceGroups((commerceWorksData as any).groups).groups;
        setCommerceGroups(fallbackGroups);
        setSavedCommerceGroups(cloneCommerceGroups(fallbackGroups));
      });

    return () => {
      cancelled = true;
    };
  }, [isCommerceModule]);

  const openCommerceEditor = () => {
    setCommerceEditorOpen(true);
    window.history.replaceState(null, "", "/work/commerce?edit=1");
  };

  const closeCommerceEditor = () => {
    setCommerceEditorOpen(false);
    window.history.replaceState(null, "", "/work/commerce");
  };

  const saveCommerceGroups = async () => {
    setCommerceSaving(true);
    try {
      const response = await fetch("/api/commerce-works/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groups: commerceGroups }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "保存失败");
      setSavedCommerceGroups(cloneCommerceGroups(commerceGroups));
    } catch (error) {
      alert(`保存失败：${error instanceof Error ? error.message : String(error)}。请使用“导出JSON”备份当前数据。`);
    } finally {
      setCommerceSaving(false);
    }
  };

  return (
    <main className={`project-page module-${module.id}`}>
      <nav className="project-page-nav">
        <button type="button" className="project-logo" onClick={onBack}>
          <span>Z</span>
          <strong>[PORTFOLIO]</strong>
        </button>
        <div className="project-page-links">
          <button type="button" onClick={onBack}>[ALL MODULES]</button>
          <a href={`mailto:${contact.email}`}>[CONTACT]</a>
        </div>
      </nav>

      <section className="project-page-hero-section">
        <div className="container">
          <button className="module-back" type="button" onClick={onBack}>
            返回作品模块
          </button>

          <div className="module-page-hero">
            <div>
              <span className="section-kicker">{module.tag}</span>
              <h2 ref={titleRef} tabIndex={-1}>{module.title}</h2>
            </div>
            <p>{module.desc}</p>
          </div>

          {isCommerceModule ? (
            <CommerceShowcase module={module} />
          ) : (
            <div className="module-page-cover">
              <PortfolioMedia item={{ ...getModuleCoverItem(module), title: module.title }} preview />
            </div>
          )}
        </div>
      </section>

      <section className="project-page-works">
        <div className="container">
          <div className="module-subhead">
            <span>{isCommerceModule ? `${countCommerceWorks(commerceGroups)} Works` : module.meta}</span>
            <h3>Works</h3>
          </div>

          {isCommerceModule ? (
            <CommerceWorksAccordion groups={commerceGroups} onOpenProject={onOpenCommerceProject} />
          ) : (
            <div className="portfolio-grid module-work-grid flat-work-grid">
              {module.works.map((item, index) => (
                <article
                  className={`portfolio-card ${getMediaClass(item)}`}
                  key={item.src}
                  style={{ animationDelay: `${470 + Math.min(index, 8) * 38}ms` }}
                  role="button"
                  tabIndex={0}
                  onClick={() => setPreviewItem(item)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setPreviewItem(item);
                    }
                  }}
                >
                  <PortfolioMedia item={item} />

                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      {isCommerceModule && !commerceEditorOpen && ["localhost", "127.0.0.1"].includes(window.location.hostname) && (
        <button className="commerce-works-edit-toggle" type="button" onClick={openCommerceEditor}>
          编辑作品
        </button>
      )}
      {isCommerceModule && commerceEditorOpen && (
        <CommerceWorksEditor
          groups={commerceGroups}
          onChange={setCommerceGroups}
          onSave={saveCommerceGroups}
          onClose={closeCommerceEditor}
          onReset={() => setCommerceGroups(cloneCommerceGroups(savedCommerceGroups))}
          dirty={commerceDirty}
          saving={commerceSaving}
        />
      )}
      {previewItem && <MediaPreview item={previewItem} onClose={() => setPreviewItem(null)} />}
    </main>
  );
}

function MediaPreview({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="media-preview" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="media-preview-close" type="button" onClick={onClose}>
        CLOSE
      </button>
      <div className="media-preview-stage" onClick={(event) => event.stopPropagation()}>
        <PortfolioMedia item={item} />
      </div>
    </div>
  );
}

function Strengths() {
  return (
    <section className="section strengths" id="strength">
      <div className="container">
        <div className="section-head compact">
          <span className="section-kicker">个人优势</span>
          <h2>从“想法”到“上线素材”的连续生产能力。</h2>
        </div>
        <div className="strength-grid">
          {strengths.map(({ icon: Icon, title, text }) => (
            <article className="strength-card" key={title}>
              <div className="icon-box">
                <Icon size={24} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactEnd() {
  return (
    <section className="end-contact" id="contact">
      <div className="container end-layout">
        <div>
          <span className="section-kicker">Contact</span>
          <h2>期待一起打造更清晰、更有质感的视觉内容。</h2>
        </div>
        <div className="end-panel">
          <a href={`mailto:${contact.email}`}>
            <Mail size={20} />
            {contact.email}
          </a>
          <a href={`tel:${contact.phone}`}>
            <Phone size={20} />
            {contact.phone}
          </a>
          <span>
            <MapPin size={20} />
            {contact.location}
          </span>
        </div>
      </div>
      <div className="end-mark">
        <Cpu size={28} />
        LI HUIQUAN PORTFOLIO
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);


























