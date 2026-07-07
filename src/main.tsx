import React, { lazy, useEffect, useState } from "react";
import { useRef } from "react";
import { Suspense, useCallback, useMemo } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import "./styles.css";

const Lanyard = lazy(() => import("./components/lanyard/Lanyard.jsx"));
const CommerceShowcase = lazy(() => import("./components/CommerceShowcase.jsx"));

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();
  window.location.reload();
});

function forceTopScrollState() {
  ScrollTrigger.clearScrollMemory("manual");
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
}

forceTopScrollState();

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
    "title": "产品渲染",
    "tag": "Product Rendering",
    "desc": "C4D / Octane 产品渲染、材质质感与商业构图练习，集中展示产品、场景和细节表现。",
    "cover": "/portfolio-full/rendering/rendering-01.jpg",
    "meta": "28 Works",
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
        "title": "001.2版本 按摩椅",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-03.webp",
        "media": "image",
        "size": "wide",
        "original": "001.2版本-按摩椅.png"
      },
      {
        "title": "05",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-04.png",
        "media": "image",
        "size": "wide",
        "original": "05.png"
      },
      {
        "title": "06(1)",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-05.png",
        "media": "image",
        "size": "wide",
        "original": "06(1).png"
      },
      {
        "title": "06",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-06.png",
        "media": "image",
        "size": "wide",
        "original": "06.png"
      },
      {
        "title": "1 1",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-07.jpg",
        "media": "image",
        "size": "wide",
        "original": "1-1.jpg"
      },
      {
        "title": "1oc",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-08.jpg",
        "media": "image",
        "size": "tall",
        "original": "1oc.jpg"
      },
      {
        "title": "bj1 5",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-09.png",
        "media": "image",
        "size": "",
        "original": "bj1-5.png"
      },
      {
        "title": "Rs渲染",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-10.jpg",
        "media": "image",
        "size": "tall",
        "original": "Rs渲染.jpg"
      },
      {
        "title": "xr1",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-11.png",
        "media": "image",
        "size": "",
        "original": "xr1.png"
      },
      {
        "title": "主图 (0 00 15 02)",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-12.jpg",
        "media": "image",
        "size": "wide",
        "original": "主图 (0-00-15-02).jpg"
      },
      {
        "title": "主图",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-13.jpg",
        "media": "image",
        "size": "tall",
        "original": "主图.jpg"
      },
      {
        "title": "产品 化妆品",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-14.jpg",
        "media": "image",
        "size": "long",
        "original": "产品-化妆品.jpg"
      },
      {
        "title": "产品 咖啡机",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-15.jpg",
        "media": "image",
        "size": "long",
        "original": "产品-咖啡机.jpg"
      },
      {
        "title": "产品 耳机",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-16.jpg",
        "media": "image",
        "size": "wide",
        "original": "产品-耳机.jpg"
      },
      {
        "title": "产品 香水",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-17.jpg",
        "media": "image",
        "size": "long",
        "original": "产品-香水.jpg"
      },
      {
        "title": "参考",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-18.jpg",
        "media": "image",
        "size": "wide",
        "original": "参考.jpg"
      },
      {
        "title": "后期调整",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-19.jpg",
        "media": "image",
        "size": "tall",
        "original": "后期调整.jpg"
      },
      {
        "title": "后期调色",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-20.jpg",
        "media": "image",
        "size": "long",
        "original": "后期调色.jpg"
      },
      {
        "title": "小音箱",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-21.png",
        "media": "image",
        "size": "wide",
        "original": "小音箱.png"
      },
      {
        "title": "手表（1）",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-22.jpg",
        "media": "image",
        "size": "wide",
        "original": "手表（1）.jpg"
      },
      {
        "title": "手表（2）",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-23.jpg",
        "media": "image",
        "size": "tall",
        "original": "手表（2）.jpg"
      },
      {
        "title": "摆件",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-24.jpg",
        "media": "image",
        "size": "tall",
        "original": "摆件.jpg"
      },
      {
        "title": "测试质感2",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-25.webp",
        "media": "image",
        "size": "tall",
        "original": "测试质感2.png"
      },
      {
        "title": "电饭煲后期",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-26.jpg",
        "media": "image",
        "size": "wide",
        "original": "电饭煲后期.jpg"
      },
      {
        "title": "超现实 机器人",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-27.jpg",
        "media": "image",
        "size": "long",
        "original": "超现实-机器人.jpg"
      },
      {
        "title": "风扇海报渲染输出",
        "tag": "产品渲染",
        "src": "/portfolio-full/rendering/rendering-28.webp",
        "media": "image",
        "size": "long",
        "original": "风扇海报渲染输出.png"
      }
    ]
  },

  {
    "id": "motion",
    "title": "产品动画",
    "tag": "Product Motion",
    "desc": "产品动态、镜头运镜与短视频成片内容，展示从模型、灯光到动画输出的动态视觉能力。",
    "cover": "/portfolio-full/motion/motion-01.mp4",
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
    "title": "电商主副图",
    "tag": "E-commerce Visual",
    "desc": "围绕三角充、红白机、小包等产品系列制作主图、卖点图和平台商品视觉。",
    "cover": "/portfolio-full/commerce/commerce-01.jpg",
    "meta": "60 Works",
    "works": [
      {
        "title": " temp 0000 0",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-01.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0000-0.jpg"
      },
      {
        "title": " temp 0000 1",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-02.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0000-1.jpg"
      },
      {
        "title": " temp 0000",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-03.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0000.jpg"
      },
      {
        "title": " temp 0000 2",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-04.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0000-2.jpg"
      },
      {
        "title": " temp 0000 3",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-05.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0000-3.jpg"
      },
      {
        "title": " temp 0000 4",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-06.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0000-4.jpg"
      },
      {
        "title": " temp 0000 5",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-07.png",
        "media": "image",
        "size": "tall",
        "original": "__temp_0000-5.png"
      },
      {
        "title": " temp 0000 6",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-08.png",
        "media": "image",
        "size": "tall",
        "original": "__temp_0000-6.png"
      },
      {
        "title": " temp 0000 7",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-09.png",
        "media": "image",
        "size": "tall",
        "original": "__temp_0000-7.png"
      },
      {
        "title": " temp 0000 8",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-10.png",
        "media": "image",
        "size": "tall",
        "original": "__temp_0000-8.png"
      },
      {
        "title": " temp 0000 9",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-11.png",
        "media": "image",
        "size": "tall",
        "original": "__temp_0000-9.png"
      },
      {
        "title": " temp 0000 10",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-12.png",
        "media": "image",
        "size": "tall",
        "original": "__temp_0000-10.png"
      },
      {
        "title": " temp 0001",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-13.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0001.jpg"
      },
      {
        "title": " temp 0002",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-14.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0002.jpg"
      },
      {
        "title": " temp 0003",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-15.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0003.jpg"
      },
      {
        "title": " temp 0004",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-16.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0004.jpg"
      },
      {
        "title": " temp 0005",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-17.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0005.jpg"
      },
      {
        "title": " temp 0006",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-18.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0006.jpg"
      },
      {
        "title": " temp 0007",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-19.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0007.jpg"
      },
      {
        "title": " temp 0008",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-20.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0008.jpg"
      },
      {
        "title": " temp 0009",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-21.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0009.jpg"
      },
      {
        "title": " temp 0010",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-22.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0010.jpg"
      },
      {
        "title": " temp 0011",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-23.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0011.jpg"
      },
      {
        "title": " temp 0012",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-24.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0012.jpg"
      },
      {
        "title": " temp 0013",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-25.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0013.jpg"
      },
      {
        "title": " temp 0014",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-26.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0014.jpg"
      },
      {
        "title": " temp 0015",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-27.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0015.jpg"
      },
      {
        "title": " temp 0016",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-28.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0016.jpg"
      },
      {
        "title": " temp 0017",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-29.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0017.jpg"
      },
      {
        "title": " temp 0018",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-30.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0018.jpg"
      },
      {
        "title": " temp 0019",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-31.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0019.webp"
      },
      {
        "title": " temp 0020",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-32.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0020.webp"
      },
      {
        "title": " temp 0021",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-33.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0021.webp"
      },
      {
        "title": " temp 0022",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-34.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0022.webp"
      },
      {
        "title": " temp 0023",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-35.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0023.webp"
      },
      {
        "title": " temp 0024",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-36.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0024.jpg"
      },
      {
        "title": " temp 0025",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-37.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0025.jpg"
      },
      {
        "title": " temp 0026",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-38.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0026.jpg"
      },
      {
        "title": " temp 0027",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-39.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0027.jpg"
      },
      {
        "title": " temp 0028",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-40.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0028.jpg"
      },
      {
        "title": " temp 0029",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-41.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0029.jpg"
      },
      {
        "title": " temp 0030",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-42.jpg",
        "media": "image",
        "size": "",
        "original": "__temp_0030.jpg"
      },
      {
        "title": " temp 0031",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-43.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0031.webp"
      },
      {
        "title": " temp 0032",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-44.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0032.webp"
      },
      {
        "title": " temp 0033",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-45.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0033.webp"
      },
      {
        "title": " temp 0034",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-46.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0034.webp"
      },
      {
        "title": " temp 0035",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-47.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0035.webp"
      },
      {
        "title": " temp 0036",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-48.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0036.png"
      },
      {
        "title": " temp 0037",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-49.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0037.webp"
      },
      {
        "title": " temp 0038",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-50.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0038.webp"
      },
      {
        "title": " temp 0039",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-51.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0039.webp"
      },
      {
        "title": " temp 0040",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-52.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0040.webp"
      },
      {
        "title": " temp 0041",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-53.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0041.webp"
      },
      {
        "title": " temp 0042",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-54.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0042.webp"
      },
      {
        "title": " temp 0043",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-55.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0043.webp"
      },
      {
        "title": " temp 0044",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-56.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0044.webp"
      },
      {
        "title": " temp 0045",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-57.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0045.webp"
      },
      {
        "title": " temp 0046",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-58.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0046.webp"
      },
      {
        "title": " temp 0047",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-59.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0047.webp"
      },
      {
        "title": " temp 0048",
        "tag": "电商产品视觉",
        "src": "/portfolio-full/commerce/commerce-60.webp",
        "media": "image",
        "size": "",
        "original": "__temp_0048.webp"
      }
    ]
  },
  {
      "id": "aigc",
      "title": "AIGC",
      "tag": "AIGC Character",
      "desc": "AI 人物视觉、产品佩戴场景和概念画面探索，强调商业质感与视觉叙事。",
      "cover": "/portfolio-full/aigc/aigc-01.png",
      "meta": "29 Works",
      "works": [
          {
              "title": "AIGC (1)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-01.png",
              "media": "image",
              "size": "",
              "original": "AIGC (1).png"
          },
          {
              "title": "AIGC (2)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-02.png",
              "media": "image",
              "size": "",
              "original": "AIGC (2).png"
          },
          {
              "title": "AIGC (3)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-03.png",
              "media": "image",
              "size": "",
              "original": "AIGC (3).png"
          },
          {
              "title": "AIGC (4)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-04.png",
              "media": "image",
              "size": "",
              "original": "AIGC (4).png"
          },
          {
              "title": "AIGC (5)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-05.png",
              "media": "image",
              "size": "",
              "original": "AIGC (5).png"
          },
          {
              "title": "AIGC (6)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-06.png",
              "media": "image",
              "size": "",
              "original": "AIGC (6).png"
          },
          {
              "title": "AIGC (7)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-07.png",
              "media": "image",
              "size": "",
              "original": "AIGC (7).png"
          },
          {
              "title": "AIGC (8)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-08.png",
              "media": "image",
              "size": "",
              "original": "AIGC (8).png"
          },
          {
              "title": "AIGC (9)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-09.png",
              "media": "image",
              "size": "",
              "original": "AIGC (9).png"
          },
          {
              "title": "AIGC (10)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-10.png",
              "media": "image",
              "size": "",
              "original": "AIGC (10).png"
          },
          {
              "title": "AIGC (11)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-11.png",
              "media": "image",
              "size": "",
              "original": "AIGC (11).png"
          },
          {
              "title": "AIGC (12)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-12.png",
              "media": "image",
              "size": "",
              "original": "AIGC (12).png"
          },
          {
              "title": "AIGC (13)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-13.png",
              "media": "image",
              "size": "",
              "original": "AIGC (13).png"
          },
          {
              "title": "AIGC (14)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-14.png",
              "media": "image",
              "size": "",
              "original": "AIGC (14).png"
          },
          {
              "title": "AIGC (15)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-15.png",
              "media": "image",
              "size": "",
              "original": "AIGC (15).png"
          },
          {
              "title": "AIGC (16)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-16.png",
              "media": "image",
              "size": "",
              "original": "AIGC (16).png"
          },
          {
              "title": "AIGC (17)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-17.png",
              "media": "image",
              "size": "",
              "original": "AIGC (17).png"
          },
          {
              "title": "AIGC (18)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-18.png",
              "media": "image",
              "size": "",
              "original": "AIGC (18).png"
          },
          {
              "title": "AIGC (19)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-19.png",
              "media": "image",
              "size": "",
              "original": "AIGC (19).png"
          },
          {
              "title": "AIGC (20)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-20.png",
              "media": "image",
              "size": "",
              "original": "AIGC (20).png"
          },
          {
              "title": "AIGC (21)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-21.png",
              "media": "image",
              "size": "",
              "original": "AIGC (21).png"
          },
          {
              "title": "AIGC (22)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-22.png",
              "media": "image",
              "size": "",
              "original": "AIGC (22).png"
          },
          {
              "title": "AIGC (23)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-23.png",
              "media": "image",
              "size": "",
              "original": "AIGC (23).png"
          },
          {
              "title": "AIGC (24)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-24.png",
              "media": "image",
              "size": "",
              "original": "AIGC (24).png"
          },
          {
              "title": "AIGC (25)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-25.webp",
              "media": "image",
              "size": "",
              "original": "AIGC (25).png"
          },
          {
              "title": "AIGC (26)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-26.png",
              "media": "image",
              "size": "",
              "original": "AIGC (26).png"
          },
          {
              "title": "AIGC (27)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-27.png",
              "media": "image",
              "size": "",
              "original": "AIGC (27).png"
          },
          {
              "title": "AIGC (28)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-28.png",
              "media": "image",
              "size": "",
              "original": "AIGC (28).png"
          },
          {
              "title": "AIGC (29)",
              "tag": "AIGC-人物",
              "src": "/portfolio-full/aigc/aigc-29.jpg",
              "media": "image",
              "size": "",
              "original": "AIGC (29).jpg"
          }
      ]
  },
    {
        "id": "longform",
        "title": "电商详情页",
        "tag": "Long-form Detail Page",
        "desc": "长图详情页与动态详情页内容，适合纵向浏览产品卖点、功能和使用场景。",
        "cover": "/portfolio-full/longform/longform-01.png",
        "meta": "8 Works",
        "works": [
            {
                "title": "1",
                "tag": "详情页",
                "src": "/portfolio-full/longform/longform-01.png",
                "media": "image",
                "size": "long",
                "original": "1.png"
            },
            {
                "title": "2",
                "tag": "详情页",
                "src": "/portfolio-full/longform/longform-02.webp",
                "media": "image",
                "size": "long",
                "original": "2.png"
            },
            {
                "title": "3",
                "tag": "详情页",
                "src": "/portfolio-full/longform/longform-03.jpg",
                "media": "image",
                "size": "long",
                "original": "3.jpg"
            },
            {
                "title": "4",
                "tag": "详情页",
                "src": "/portfolio-full/longform/longform-04.jpg",
                "media": "image",
                "size": "long",
                "original": "4.jpg"
            },
            {
                "title": "5",
                "tag": "详情页",
                "src": "/portfolio-full/longform/longform-05.jpg",
                "media": "image",
                "size": "long",
                "original": "5.jpg"
            },
            {
                "title": "6",
                "tag": "详情页",
                "src": "/portfolio-full/longform/longform-06.png",
                "media": "image",
                "size": "long",
                "original": "6.png"
            },
            {
                "title": "7",
                "tag": "详情页",
                "src": "/portfolio-full/longform/longform-07.png",
                "media": "image",
                "size": "long",
                "original": "7.png"
            },
            {
                "title": "8",
                "tag": "详情页",
                "src": "/portfolio-full/longform/longform-08.png",
                "media": "image",
                "size": "long",
                "original": "8.png"
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

function getMediaClass(item) {
  return [item.size, item.media === "video" ? "video-card" : "", item.media === "gif" ? "gif-card" : ""]
    .filter(Boolean)
    .join(" ");
}

const longformImageMeta = {
  "/portfolio-full/longform/longform-01.png": { width: 1063, height: 5236 },
  "/portfolio-full/longform/longform-02.webp": { width: 1080, height: 11635 },
  "/portfolio-full/longform/longform-03.jpg": { width: 1464, height: 4799 },
  "/portfolio-full/longform/longform-04.jpg": { width: 1464, height: 4204 },
  "/portfolio-full/longform/longform-05.jpg": { width: 1464, height: 5399 },
  "/portfolio-full/longform/longform-06.png": { width: 1704, height: 7056 },
  "/portfolio-full/longform/longform-07.png": { width: 1704, height: 6541 },
  "/portfolio-full/longform/longform-08.png": { width: 1894, height: 6329 },
};

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

function shouldShowTuningControls() {
  return new URLSearchParams(window.location.search).get("controls") === "1";
}

function refreshScrollTriggersAfterStableLayout() {
  const refreshAfterLoad = () => {
    requestAnimationFrame(async () => {
      const fontReady = document.fonts?.ready.catch(() => undefined) || Promise.resolve();
      const imageReady = Promise.all(
        Array.from(document.images).map((image) => {
          if (image.complete) return Promise.resolve();
          return new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
          });
        }),
      );

      await Promise.race([
        Promise.all([fontReady, imageReady]),
        new Promise((resolve) => window.setTimeout(resolve, 1200)),
      ]);

      forceTopScrollState();
      ScrollTrigger.refresh(true);
      forceTopScrollState();
    });
  };

  if (document.readyState === "complete") {
    requestAnimationFrame(() => {
      requestAnimationFrame(refreshAfterLoad);
    });
    return;
  }

  window.addEventListener(
    "load",
    () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(refreshAfterLoad);
      });
    },
    { once: true },
  );
}

type SectionScrubReveal = "about" | "strengths" | "contact";

function useLoadNearViewport(
  targetRef: React.RefObject<Element | null>,
  rootMargin = "700px 0px",
) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasUserScrolled, setHasUserScrolled] = useState(false);

  useEffect(() => {
    if (hasUserScrolled || shouldLoad) return undefined;

    const handleFirstScroll = () => setHasUserScrolled(true);
    window.addEventListener("scroll", handleFirstScroll, { once: true, passive: true });
    window.addEventListener("wheel", handleFirstScroll, { once: true, passive: true });
    window.addEventListener("touchmove", handleFirstScroll, { once: true, passive: true });

    return () => {
      window.removeEventListener("scroll", handleFirstScroll);
      window.removeEventListener("wheel", handleFirstScroll);
      window.removeEventListener("touchmove", handleFirstScroll);
    };
  }, [hasUserScrolled, shouldLoad]);

  useEffect(() => {
    if (shouldLoad || !hasUserScrolled) return undefined;
    const target = targetRef.current;
    if (!target) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasUserScrolled, rootMargin, shouldLoad, targetRef]);

  return shouldLoad;
}

function useGsapSectionScrubReveal(
  sectionRef: React.RefObject<HTMLElement | null>,
  section: SectionScrubReveal,
) {
  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const context = gsap.context(() => {
      if (section === "about") {
        const aboutContent = sectionElement.querySelector("[data-about-content]");
        const title = sectionElement.querySelector("[data-about-title]");
        const description = sectionElement.querySelector("[data-about-description]");
        const experienceCards = gsap.utils.toArray<HTMLElement>(
          sectionElement.querySelectorAll("[data-about-experience]"),
        );
        const contact = sectionElement.querySelector("[data-about-contact]");
        const stats = gsap.utils.toArray<HTMLElement>(
          sectionElement.querySelectorAll("[data-about-stat]"),
        );

        if (!aboutContent || !title || !description || !contact || experienceCards.length === 0 || stats.length === 0) {
          console.warn("About reveal skipped: missing required DOM nodes.");
          return;
        }

        gsap.set(title, {
          opacity: 0,
          y: 80,
          filter: "blur(8px)",
        });

        gsap.set(description, {
          opacity: 0,
          y: 50,
          filter: "blur(5px)",
        });

        gsap.set(experienceCards, {
          opacity: 0,
          y: 60,
        });

        gsap.set(contact, {
          opacity: 0,
          y: 35,
        });

        gsap.set(stats, {
          opacity: 0,
          y: 40,
        });

        ScrollTrigger.getById("about-reveal")?.kill();

        const timeline = gsap.timeline({
          defaults: {
            ease: "none",
          },
          scrollTrigger: {
            id: "about-reveal",
            trigger: aboutContent,
            start: "top 62%",
            end: "+=260",
            scrub: 0.2,
            markers: false,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(title, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.25,
          })
          .to(description, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.18,
          }, 0.08)
          .to(experienceCards, {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.22,
          }, 0.14)
          .to(contact, {
            opacity: 1,
            y: 0,
            duration: 0.16,
          }, 0.23)
          .to(stats, {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.18,
          }, 0.28);

        refreshScrollTriggersAfterStableLayout();
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionElement,
          start: "top 82%",
          end: section === "contact" ? "+=280" : "+=300",
          scrub: 0.25,
          invalidateOnRefresh: true,
        },
      });

      if (section === "strengths") {
        timeline
          .fromTo(
            ".section-head",
            { opacity: 0, y: 60, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.24, ease: "none" },
          )
          .fromTo(
            ".strength-card",
            { opacity: 0, y: 50, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.06, duration: 0.26, ease: "none" },
            0.12,
          );
      }

      if (section === "contact") {
        timeline
          .fromTo(
            ".end-heading-motion",
            { opacity: 0, y: 60, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.24, ease: "none" },
          )
          .fromTo(
            ".end-panel",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.2, ease: "none" },
            0.12,
          )
          .fromTo(
            ".end-mark",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.16, ease: "none" },
            0.24,
          );
      }

      ScrollTrigger.refresh();
    }, sectionElement);

    return () => {
      context.revert();
    };
  }, [sectionRef, section]);
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

  useEffect(() => {
    forceTopScrollState();
  }, []);

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
  x: 93,
  y: 69,
  scale: 1.29,
  opacity: 1,
  brightness: 1,
  contrast: 1.08,
  saturation: 1.08,
};

const defaultHeroTextSettings = {
  titleX: -197,
  titleY: 226,
  titleSize: 186,
  titleWidth: 110,
  titleSkew: -6,
  titleLineHeight: 0.82,
  titleLetterSpacing: 0.01,
  accentLetterSpacing: 0.015,
  titleGap: 0,
  copyX: 0,
  copyY: 0,
  copySize: 18,
  kickerX: 0,
  kickerY: 0,
  kickerSize: 16,
  hudX: 1,
  hudY: 0,
  hudOpacity: 0,
  trailOpacity: 68,
  trailWidth: 58,
};

const heroSettingsVersion = "hero-fixed-2026-07-06-01";

const defaultModuleImageSettings = {
  x: 50,
  y: 50,
  scale: 1,
};

const defaultAboutContentSettings = {
  x: -75,
  y: 0,
  width: 1000,
  headingX: 0,
  headingY: 0,
  headingWidth: 1000,
  headingGap: 18,
  kickerSize: 12,
  kickerLetterSpacing: 0.06,
  titleSize: 82,
  titleLineHeight: 0.95,
  titleLetterSpacing: -0.04,
  descriptionSize: 15,
  descriptionTop: 24,
  descriptionLineHeight: 1.58,
  descriptionLetterSpacing: 0,
  experienceX: 0,
  experienceY: 0,
  experienceWidth: 1000,
  experienceTop: 52,
  experienceGap: 10,
  cardHeight: 150,
  cardPaddingX: 24,
  cardPaddingY: 20,
  cardTimeSize: 12,
  cardTimeGap: 6,
  cardTitleSize: 32,
  cardTitleLineHeight: 1.12,
  cardTextSize: 12,
  cardTextTop: 6,
  cardTextLineHeight: 1.28,
  cardLetterSpacing: 0,
  contactX: 0,
  contactY: 0,
  contactWidth: 1000,
  contactTop: 24,
  contactGap: 10,
  contactPaddingX: 14,
  contactPaddingY: 10,
  contactFontSize: 14,
  contactIconGap: 9,
  statsX: 0,
  statsY: 0,
  statsWidth: 1000,
  statsTop: 24,
  statsGap: 10,
  statHeight: 72,
  statPaddingX: 12,
  statPaddingY: 10,
  statValueSize: 20,
  statValueLineHeight: 1.12,
  statValueBottom: 8,
  statLabelSize: 12,
  statLabelLineHeight: 1.22,
  statLetterSpacing: 0,
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
      const storedVideoSettings = JSON.parse(localStorage.getItem("heroVideoSettings") || "{}");
      const shouldMigrateHeroSettings = localStorage.getItem("heroSettingsVersion") !== heroSettingsVersion;
      if (shouldMigrateHeroSettings) {
        if (storedVideoSettings.x === 36) storedVideoSettings.x = defaultVideoSettings.x;
        if (storedVideoSettings.y === 48) storedVideoSettings.y = defaultVideoSettings.y;
        if (storedVideoSettings.scale === 1.18) storedVideoSettings.scale = defaultVideoSettings.scale;
      }
      return {
        ...defaultVideoSettings,
        ...storedVideoSettings,
      };
    } catch {
      return defaultVideoSettings;
    }
  });
  const [heroTextSettings, setHeroTextSettings] = useState(() => {
    try {
      const storedHeroTextSettings = JSON.parse(localStorage.getItem("heroTextSettingsV2") || "{}");
      const shouldMigrateHeroSettings = localStorage.getItem("heroSettingsVersion") !== heroSettingsVersion;
      if (shouldMigrateHeroSettings) {
        if (storedHeroTextSettings.titleSize === 132) storedHeroTextSettings.titleSize = defaultHeroTextSettings.titleSize;
        if (storedHeroTextSettings.titleSize === 170) storedHeroTextSettings.titleSize = defaultHeroTextSettings.titleSize;
        if (storedHeroTextSettings.titleX === 0) storedHeroTextSettings.titleX = defaultHeroTextSettings.titleX;
        if (storedHeroTextSettings.titleY === 0) storedHeroTextSettings.titleY = defaultHeroTextSettings.titleY;
        if (storedHeroTextSettings.titleWidth === 98) storedHeroTextSettings.titleWidth = defaultHeroTextSettings.titleWidth;
        if (storedHeroTextSettings.titleLetterSpacing < -0.04) storedHeroTextSettings.titleLetterSpacing = defaultHeroTextSettings.titleLetterSpacing;
        if (storedHeroTextSettings.accentLetterSpacing < -0.04) storedHeroTextSettings.accentLetterSpacing = defaultHeroTextSettings.accentLetterSpacing;
        if (storedHeroTextSettings.hudOpacity === 75) storedHeroTextSettings.hudOpacity = defaultHeroTextSettings.hudOpacity;
      }
      return {
        ...defaultHeroTextSettings,
        ...storedHeroTextSettings,
      };
    } catch {
      return defaultHeroTextSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem("heroVideoSettings", JSON.stringify(videoSettings));
    localStorage.setItem("heroSettingsVersion", heroSettingsVersion);
  }, [videoSettings]);

  useEffect(() => {
    localStorage.setItem("heroTextSettingsV2", JSON.stringify(heroTextSettings));
  }, [heroTextSettings]);

  const updateVideoSetting = (key, value) => {
    setVideoSettings((current) => ({ ...current, [key]: Number(value) }));
  };

  const updateHeroTextSetting = (key, value) => {
    setHeroTextSettings((current) => ({ ...current, [key]: Number(value) }));
  };

  const resetHeroSettings = () => {
    setVideoSettings(defaultVideoSettings);
    setHeroTextSettings(defaultHeroTextSettings);
  };

  const videoStyle = {
    objectPosition: `${videoSettings.x}% ${videoSettings.y}%`,
    opacity: videoSettings.opacity,
    filter: `saturate(${videoSettings.saturation}) contrast(${videoSettings.contrast}) brightness(${videoSettings.brightness})`,
    transform: `scale(${videoSettings.scale})`,
    transformOrigin: `${videoSettings.x}% ${videoSettings.y}%`,
  };

  const heroTextStyle: React.CSSProperties & Record<string, string> = {
    "--hero-title-x": `${heroTextSettings.titleX}px`,
    "--hero-title-y": `${heroTextSettings.titleY}px`,
    "--hero-title-size": `${heroTextSettings.titleSize}px`,
    "--hero-title-width": `${heroTextSettings.titleWidth / 100}`,
    "--hero-title-skew": `${heroTextSettings.titleSkew}deg`,
    "--hero-title-line-height": `${heroTextSettings.titleLineHeight}`,
    "--hero-title-letter-spacing": `${heroTextSettings.titleLetterSpacing}em`,
    "--hero-accent-letter-spacing": `${heroTextSettings.accentLetterSpacing}em`,
    "--hero-title-gap": `${heroTextSettings.titleGap}px`,
    "--hero-copy-x": `${heroTextSettings.copyX}px`,
    "--hero-copy-y": `${heroTextSettings.copyY}px`,
    "--hero-copy-size": `${heroTextSettings.copySize}px`,
    "--hero-kicker-x": `${heroTextSettings.kickerX}px`,
    "--hero-kicker-y": `${heroTextSettings.kickerY}px`,
    "--hero-kicker-size": `${heroTextSettings.kickerSize}px`,
    "--hero-hud-x": `${heroTextSettings.hudX}px`,
    "--hero-hud-y": `${heroTextSettings.hudY}px`,
    "--hero-hud-opacity": `${heroTextSettings.hudOpacity / 100}`,
    "--hero-trail-opacity": `${heroTextSettings.trailOpacity / 100}`,
    "--hero-trail-width": `${heroTextSettings.trailWidth}%`,
  };

  return (
    <section className="hero" id="home">
      <div className="hero-video-frame" aria-hidden="true">
        <video className="hero-video" style={videoStyle} autoPlay muted loop playsInline poster="/hero-poster.svg" onLoadedMetadata={(event) => { event.currentTarget.playbackRate = 0.7; }}>
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container hero-content hero-index-layout" style={heroTextStyle}>
        <div className="hero-statement hero-copy" aria-labelledby="hero-title">
          <div className="hero-kicker">
            <span>VISUAL SYSTEMS</span>
          </div>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-title-line">
              VISUAL SYSTEMS
            </span>
            <span className="hero-title-line hero-title-accent" data-text="MOTION">
              MOTION
            </span>
          </h1>
          <div className="hero-hud" aria-hidden="true">
            <span className="hero-hud-cross hero-hud-cross-a" />
            <span className="hero-hud-cross hero-hud-cross-b" />
            <span className="hero-hud-ring" />
            <span className="hero-hud-line hero-hud-line-a" />
            <span className="hero-hud-line hero-hud-line-b" />
          </div>
          <p className="hero-microcopy">
            Visual systems for product, commerce, and motion. Selected works in rendering, AI visuals, ecommerce pages, and motion content.
          </p>
        </div>
      </div>
      {shouldShowTuningControls() && (
        <HeroTuningPanel
          videoSettings={videoSettings}
          textSettings={heroTextSettings}
          onVideoChange={updateVideoSetting}
          onTextChange={updateHeroTextSetting}
          onReset={resetHeroSettings}
        />
      )}
    </section>
  );
}
function HeroTuningPanel({ videoSettings, textSettings, onVideoChange, onTextChange, onReset }) {
  const [collapsed, setCollapsed] = useState(true);
  const panelTitle = "首页控制台";
  const textGroupTitle = "标题与文案";
  const videoGroupTitle = "背景视频";
  const textControlLabels = {
    titleSize: "标题字号",
    titleX: "标题 X",
    titleY: "标题 Y",
    titleWidth: "标题宽度",
    titleSkew: "标题倾斜",
    titleLineHeight: "标题行高",
    titleLetterSpacing: "白字字距",
    accentLetterSpacing: "绿字字距",
    titleGap: "两行间距",
    copySize: "说明字号",
    copyX: "说明 X",
    copyY: "说明 Y",
    kickerSize: "标签字号",
    kickerX: "标签 X",
    kickerY: "标签 Y",
    trailOpacity: "拖影强度",
    trailWidth: "拖影宽度",
    hudOpacity: "HUD 透明",
    hudX: "HUD X",
    hudY: "HUD Y",
  };
  const videoControlLabels = {
    x: "视频 X",
    y: "视频 Y",
    scale: "视频缩放",
    opacity: "视频透明",
    brightness: "视频亮度",
    contrast: "视频对比",
    saturation: "视频饱和",
  };
  const videoControls = [
    { key: "x", label: "ˮƽλ", min: 0, max: 100, step: 1, suffix: "%" },
    { key: "y", label: "ֱλ", min: 0, max: 100, step: 1, suffix: "%" },
    { key: "scale", label: "", min: 1, max: 2.4, step: 0.01, suffix: "x" },
    { key: "opacity", label: "͸", min: 0.2, max: 1, step: 0.01, suffix: "" },
    { key: "brightness", label: "", min: 0.45, max: 1.3, step: 0.01, suffix: "" },
    { key: "contrast", label: "Աȶ", min: 0.7, max: 1.6, step: 0.01, suffix: "" },
    { key: "saturation", label: "Ͷ", min: 0, max: 1.8, step: 0.01, suffix: "" },
  ];
  const textControls = [
    { key: "titleSize", label: "С", min: 38, max: 220, step: 1, suffix: "px" },
    { key: "titleX", label: " X", min: -900, max: 900, step: 1, suffix: "px" },
    { key: "titleY", label: " Y", min: -520, max: 520, step: 1, suffix: "px" },
    { key: "titleWidth", label: "", min: 72, max: 135, step: 1, suffix: "%" },
    { key: "titleSkew", label: "б", min: -14, max: 0, step: 1, suffix: "deg" },
    { key: "titleLineHeight", label: "и", min: 0.62, max: 1.08, step: 0.01, suffix: "" },
    { key: "titleLetterSpacing", label: "ɫҼ", min: -0.04, max: 0.08, step: 0.005, suffix: "em" },
    { key: "accentLetterSpacing", label: "ɫҼ", min: -0.04, max: 0.08, step: 0.005, suffix: "em" },
    { key: "titleGap", label: "м", min: -24, max: 30, step: 1, suffix: "px" },
    { key: "copySize", label: "ִС", min: 10, max: 24, step: 1, suffix: "px" },
    { key: "copyX", label: " X", min: -900, max: 900, step: 1, suffix: "px" },
    { key: "copyY", label: " Y", min: -520, max: 520, step: 1, suffix: "px" },
    { key: "kickerSize", label: "ǩС", min: 10, max: 22, step: 1, suffix: "px" },
    { key: "kickerX", label: "ǩ X", min: -420, max: 420, step: 1, suffix: "px" },
    { key: "kickerY", label: "ǩ Y", min: -220, max: 220, step: 1, suffix: "px" },
    { key: "trailOpacity", label: "ɫӰǿ", min: 0, max: 100, step: 1, suffix: "%" },
    { key: "trailWidth", label: "ɫӰ", min: 0, max: 100, step: 1, suffix: "%" },
    { key: "hudOpacity", label: "HUD ͸", min: 0, max: 100, step: 1, suffix: "%" },
    { key: "hudX", label: "HUD X", min: -420, max: 420, step: 1, suffix: "px" },
    { key: "hudY", label: "HUD Y", min: -260, max: 260, step: 1, suffix: "px" },
  ];

  const fixedParamsText = JSON.stringify({
    videoSettings,
    heroTextSettings: textSettings,
  }, null, 2);

  const cssText = `title: translate(${textSettings.titleX}px, ${textSettings.titleY}px), ${textSettings.titleSize}px; copy: translate(${textSettings.copyX}px, ${textSettings.copyY}px), ${textSettings.copySize}px; video: ${videoSettings.x}% ${videoSettings.y}%, scale(${videoSettings.scale});`;

  if (collapsed) {
    return (
      <button className="video-tuning-toggle hero-tuning-toggle" type="button" onClick={() => setCollapsed(false)}>
        ҳ̨
      </button>
    );
  }

  return (
    <aside className="video-tuning-panel hero-tuning-panel" aria-label="ҳ Hero ̨">
      <div className="video-tuning-header">
        <div className="video-tuning-title">ҳ̨</div>
        <button className="video-collapse" type="button" onClick={() => setCollapsed(true)}></button>
      </div>
      <div className="hero-control-group">
        <span></span>
        {textControls.map((control) => (
          <label className="video-control" key={control.key}>
            <span>
              {textControlLabels[control.key] || control.label}
              <strong>{textSettings[control.key]}{control.suffix}</strong>
            </span>
            <input
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={textSettings[control.key]}
              onChange={(event) => onTextChange(control.key, event.target.value)}
            />
          </label>
        ))}
      </div>
      <div className="hero-control-group">
        <span>Ƶ</span>
        {videoControls.map((control) => (
        <label className="video-control" key={control.key}>
          <span>
            {videoControlLabels[control.key] || control.label}
            <strong>{videoSettings[control.key]}{control.suffix}</strong>
          </span>
          <input
            type="range"
            min={control.min}
            max={control.max}
            step={control.step}
            value={videoSettings[control.key]}
            onChange={(event) => onVideoChange(control.key, event.target.value)}
          />
        </label>
      ))}
      </div>
      <button
        className="video-reset"
        type="button"
        onClick={onReset}
      >
        
      </button>
      <button
        className="video-reset"
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(fixedParamsText);
        }}
      >
        Copy fixed params
      </button>
      <code>{fixedParamsText}</code>
      <code>{cssText}</code>
    </aside>
  );
}

function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionScrubReveal(sectionRef, "about");
  const shouldLoadLanyard = useLoadNearViewport(sectionRef, "700px 0px");

  const [aboutContentSettings, setAboutContentSettings] = useState(() => {
    try {
      return {
        ...defaultAboutContentSettings,
        ...JSON.parse(localStorage.getItem("aboutContentSettings") || "{}"),
      };
    } catch {
      return defaultAboutContentSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem("aboutContentSettings", JSON.stringify(aboutContentSettings));
  }, [aboutContentSettings]);

  const updateAboutContentSetting = (key, value) => {
    setAboutContentSettings((current) => ({ ...current, [key]: Number(value) }));
  };

  const resetAboutContentSettings = () => {
    setAboutContentSettings(defaultAboutContentSettings);
  };

  const aboutContentStyle = {
    "--about-content-x": `${aboutContentSettings.x}px`,
    "--about-content-y": `${aboutContentSettings.y}px`,
    "--about-content-width": `${aboutContentSettings.width}px`,
    "--about-heading-x": `${aboutContentSettings.headingX}px`,
    "--about-heading-y": `${aboutContentSettings.headingY}px`,
    "--about-heading-width": `${aboutContentSettings.headingWidth}px`,
    "--about-heading-gap": `${aboutContentSettings.headingGap}px`,
    "--about-kicker-size": `${aboutContentSettings.kickerSize}px`,
    "--about-kicker-letter-spacing": `${aboutContentSettings.kickerLetterSpacing}em`,
    "--about-title-size": `${aboutContentSettings.titleSize}px`,
    "--about-title-line-height": aboutContentSettings.titleLineHeight,
    "--about-title-letter-spacing": `${aboutContentSettings.titleLetterSpacing}em`,
    "--about-description-size": `${aboutContentSettings.descriptionSize}px`,
    "--about-description-top": `${aboutContentSettings.descriptionTop}px`,
    "--about-description-line-height": aboutContentSettings.descriptionLineHeight,
    "--about-description-letter-spacing": `${aboutContentSettings.descriptionLetterSpacing}em`,
    "--about-experience-x": `${aboutContentSettings.experienceX}px`,
    "--about-experience-y": `${aboutContentSettings.experienceY}px`,
    "--about-experience-width": `${aboutContentSettings.experienceWidth}px`,
    "--about-experience-top": `${aboutContentSettings.experienceTop}px`,
    "--about-experience-gap": `${aboutContentSettings.experienceGap}px`,
    "--about-card-height": `${aboutContentSettings.cardHeight}px`,
    "--about-card-padding-x": `${aboutContentSettings.cardPaddingX}px`,
    "--about-card-padding-y": `${aboutContentSettings.cardPaddingY}px`,
    "--about-card-time-size": `${aboutContentSettings.cardTimeSize}px`,
    "--about-card-time-gap": `${aboutContentSettings.cardTimeGap}px`,
    "--about-card-title-size": `${aboutContentSettings.cardTitleSize}px`,
    "--about-card-title-line-height": aboutContentSettings.cardTitleLineHeight,
    "--about-card-text-size": `${aboutContentSettings.cardTextSize}px`,
    "--about-card-text-top": `${aboutContentSettings.cardTextTop}px`,
    "--about-card-text-line-height": aboutContentSettings.cardTextLineHeight,
    "--about-card-letter-spacing": `${aboutContentSettings.cardLetterSpacing}em`,
    "--about-contact-x": `${aboutContentSettings.contactX}px`,
    "--about-contact-y": `${aboutContentSettings.contactY}px`,
    "--about-contact-width": `${aboutContentSettings.contactWidth}px`,
    "--about-contact-top": `${aboutContentSettings.contactTop}px`,
    "--about-contact-gap": `${aboutContentSettings.contactGap}px`,
    "--about-contact-padding-x": `${aboutContentSettings.contactPaddingX}px`,
    "--about-contact-padding-y": `${aboutContentSettings.contactPaddingY}px`,
    "--about-contact-font-size": `${aboutContentSettings.contactFontSize}px`,
    "--about-contact-icon-gap": `${aboutContentSettings.contactIconGap}px`,
    "--about-stats-x": `${aboutContentSettings.statsX}px`,
    "--about-stats-y": `${aboutContentSettings.statsY}px`,
    "--about-stats-width": `${aboutContentSettings.statsWidth}px`,
    "--about-stats-top": `${aboutContentSettings.statsTop}px`,
    "--about-stats-gap": `${aboutContentSettings.statsGap}px`,
    "--about-stat-height": `${aboutContentSettings.statHeight}px`,
    "--about-stat-padding-x": `${aboutContentSettings.statPaddingX}px`,
    "--about-stat-padding-y": `${aboutContentSettings.statPaddingY}px`,
    "--about-stat-value-size": `${aboutContentSettings.statValueSize}px`,
    "--about-stat-value-line-height": aboutContentSettings.statValueLineHeight,
    "--about-stat-value-bottom": `${aboutContentSettings.statValueBottom}px`,
    "--about-stat-label-size": `${aboutContentSettings.statLabelSize}px`,
    "--about-stat-label-line-height": aboutContentSettings.statLabelLineHeight,
    "--about-stat-letter-spacing": `${aboutContentSettings.statLetterSpacing}em`,
  } as React.CSSProperties;

  return (
    <section ref={sectionRef} className="section about" id="about">
      <div className="container about-layout">
        <div className="resume-badge-slot about-lanyard about-lanyard-stage" aria-label="可拖拽工作证">
          {shouldLoadLanyard ? (
            <Suspense fallback={<div className="lanyard-placeholder" aria-hidden="true" />}>
              <Lanyard
                position={[0, 0, 20]}
                gravity={[0, -40, 0]}
                fov={10}
                transparent={true}
                frontImage="/assets/lanyard/work-permit-front.png"
                imageFit="contain"
                lanyardColor="#E84B32"
                lanyardWidth={1}
              />
            </Suspense>
          ) : (
            <div className="lanyard-placeholder" aria-hidden="true" />
          )}
        </div>
        <div className="about-copy about-content" style={aboutContentStyle} data-about-content>
          <div className="about-heading">
            <h2 className="about-title" data-about-title>
              <span className="about-title-line">视觉设计、三维渲染</span>
              <span className="about-title-line">——</span>
            </h2>
            <p className="about-summary about-description" data-about-description>
              毕业于广州华立科技职业学院动漫制作技术专业，具备从 AI 概念设计、产品商业渲染、
              页面视觉优化到短视频内容产出的完整执行能力。曾在深圳市和承有限公司负责亚马逊、
              淘宝、TikTok、Instagram 与独立站等平台视觉内容搭建，覆盖产品主副图、详情页、
              动态动画和社媒素材。
            </p>
          </div>
          <div className="timeline experience-list">
            <div className="experience-card" data-about-experience>
              <time>2025.5 - 2026.5</time>
              <strong>深圳市和承有限公司 / 产品渲染师</strong>
              <p>负责多平台电商视觉、产品动态动画、独立站页面优化与短视频内容制作。</p>
            </div>
            <div className="experience-card" data-about-experience>
              <time>2023.9 - 2026.6</time>
              <strong>广州华立科技职业学院 / 动漫制作技术</strong>
              <p>熟悉 Photoshop、After Effects、Premiere Pro、Cinema 4D、Octane 等工具。</p>
            </div>
          </div>
          <div className="contact-strip about-contact" data-about-contact>
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
          <div className="stats-grid about-stats">
            {stats.map((item) => (
              <div
                className="stat-card about-stat"
                data-about-stat
                key={item.label}
              >
                <strong className="about-stat-value">{item.value}</strong>
                <span className="about-stat-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {shouldShowTuningControls() && (
        <AboutContentTuningPanel
          settings={aboutContentSettings}
          onChange={updateAboutContentSetting}
          onReset={resetAboutContentSettings}
        />
      )}
    </section>
  );
}

function AboutContentTuningPanel({ settings, onChange, onReset }) {
  const [collapsed, setCollapsed] = useState(true);
  const controlGroups = [
    {
      title: "",
      controls: [
        { key: "x", label: "ˮƽλ", min: -240, max: 120, step: 1, suffix: "px" },
        { key: "y", label: "ֱλ", min: -220, max: 180, step: 1, suffix: "px" },
        { key: "width", label: "ݿ", min: 560, max: 1120, step: 10, suffix: "px" },
      ],
    },
    {
      title: "",
      controls: [
        { key: "headingX", label: "", min: -160, max: 160, step: 1, suffix: "px" },
        { key: "headingY", label: "", min: -120, max: 120, step: 1, suffix: "px" },
        { key: "headingWidth", label: "", min: 520, max: 1120, step: 10, suffix: "px" },
        { key: "kickerSize", label: "Сֺ", min: 9, max: 18, step: 1, suffix: "px" },
        { key: "kickerLetterSpacing", label: "С־", min: -0.06, max: 0.18, step: 0.01, suffix: "em" },
        { key: "headingGap", label: "Ͼ", min: 0, max: 56, step: 1, suffix: "px" },
        { key: "titleSize", label: "ֺ", min: 48, max: 96, step: 1, suffix: "px" },
        { key: "titleLineHeight", label: "и", min: 0.82, max: 1.12, step: 0.01, suffix: "" },
        { key: "titleLetterSpacing", label: "־", min: -0.08, max: 0.04, step: 0.005, suffix: "em" },
        { key: "descriptionTop", label: "Ͼ", min: 8, max: 56, step: 1, suffix: "px" },
        { key: "descriptionSize", label: "ֺ", min: 11, max: 18, step: 1, suffix: "px" },
        { key: "descriptionLineHeight", label: "и", min: 1.1, max: 2, step: 0.01, suffix: "" },
        { key: "descriptionLetterSpacing", label: "־", min: -0.04, max: 0.08, step: 0.005, suffix: "em" },
      ],
    },
    {
      title: "Ƭ",
      controls: [
        { key: "experienceX", label: "", min: -160, max: 160, step: 1, suffix: "px" },
        { key: "experienceY", label: "", min: -120, max: 120, step: 1, suffix: "px" },
        { key: "experienceWidth", label: "", min: 460, max: 1120, step: 10, suffix: "px" },
        { key: "experienceTop", label: "Ͼ", min: 12, max: 96, step: 1, suffix: "px" },
        { key: "experienceGap", label: "Ƭ", min: 6, max: 32, step: 1, suffix: "px" },
        { key: "cardHeight", label: "Ƭ߶", min: 90, max: 220, step: 1, suffix: "px" },
        { key: "cardPaddingX", label: "ھ", min: 12, max: 44, step: 1, suffix: "px" },
        { key: "cardPaddingY", label: "ھ", min: 10, max: 36, step: 1, suffix: "px" },
        { key: "cardTimeSize", label: "ֺ", min: 9, max: 16, step: 1, suffix: "px" },
        { key: "cardTimeGap", label: "¾", min: 0, max: 18, step: 1, suffix: "px" },
        { key: "cardTitleSize", label: "Ƭ", min: 16, max: 36, step: 1, suffix: "px" },
        { key: "cardTitleLineHeight", label: "и", min: 0.95, max: 1.45, step: 0.01, suffix: "" },
        { key: "cardTextSize", label: "Ƭ", min: 10, max: 18, step: 1, suffix: "px" },
        { key: "cardTextTop", label: "Ͼ", min: 0, max: 20, step: 1, suffix: "px" },
        { key: "cardTextLineHeight", label: "и", min: 1, max: 1.8, step: 0.01, suffix: "" },
        { key: "cardLetterSpacing", label: "Ƭ־", min: -0.04, max: 0.08, step: 0.005, suffix: "em" },
      ],
    },
    {
      title: "ϵʽ",
      controls: [
        { key: "contactX", label: "ϵ", min: -160, max: 160, step: 1, suffix: "px" },
        { key: "contactY", label: "ϵ", min: -80, max: 80, step: 1, suffix: "px" },
        { key: "contactWidth", label: "ϵ", min: 420, max: 1120, step: 10, suffix: "px" },
        { key: "contactTop", label: "ϵϾ", min: 6, max: 48, step: 1, suffix: "px" },
        { key: "contactGap", label: "ť", min: 4, max: 28, step: 1, suffix: "px" },
        { key: "contactPaddingX", label: "ھ", min: 8, max: 28, step: 1, suffix: "px" },
        { key: "contactPaddingY", label: "ھ", min: 6, max: 18, step: 1, suffix: "px" },
        { key: "contactFontSize", label: "ϵֺ", min: 10, max: 18, step: 1, suffix: "px" },
        { key: "contactIconGap", label: "ͼ", min: 4, max: 18, step: 1, suffix: "px" },
      ],
    },
    {
      title: "ײ",
      controls: [
        { key: "statsX", label: "", min: -160, max: 160, step: 1, suffix: "px" },
        { key: "statsY", label: "", min: -100, max: 100, step: 1, suffix: "px" },
        { key: "statsWidth", label: "", min: 420, max: 1120, step: 10, suffix: "px" },
        { key: "statsTop", label: "Ͼ", min: 6, max: 56, step: 1, suffix: "px" },
        { key: "statsGap", label: "ݼ", min: 4, max: 28, step: 1, suffix: "px" },
        { key: "statHeight", label: "ݸ߶", min: 56, max: 140, step: 1, suffix: "px" },
        { key: "statPaddingX", label: "ھ", min: 8, max: 28, step: 1, suffix: "px" },
        { key: "statPaddingY", label: "ھ", min: 6, max: 24, step: 1, suffix: "px" },
        { key: "statValueSize", label: "ֺ", min: 16, max: 30, step: 1, suffix: "px" },
        { key: "statValueLineHeight", label: "и", min: 0.9, max: 1.5, step: 0.01, suffix: "" },
        { key: "statValueBottom", label: "¾", min: 0, max: 18, step: 1, suffix: "px" },
        { key: "statLabelSize", label: "˵ֺ", min: 10, max: 16, step: 1, suffix: "px" },
        { key: "statLabelLineHeight", label: "˵и", min: 1, max: 1.8, step: 0.01, suffix: "" },
        { key: "statLetterSpacing", label: "־", min: -0.04, max: 0.08, step: 0.005, suffix: "em" },
      ],
    },
  ];

  const controls = controlGroups.flatMap((group) => group.controls);
  const cssText = `x: ${settings.x}px; y: ${settings.y}px; width: ${settings.width}px; title: ${settings.titleSize}px; card: ${settings.cardHeight}px;`;

  if (collapsed) {
    return (
      <button className="about-content-tuning-toggle" type="button" onClick={() => setCollapsed(false)}>
        ݿ̨
      </button>
    );
  }

  return (
    <aside className="about-content-tuning-panel" aria-label="˾λÿ̨">
      <div className="video-tuning-header">
        <div className="video-tuning-title">˾ݿ̨</div>
        <button className="video-collapse" type="button" onClick={() => setCollapsed(true)}></button>
      </div>
      {controlGroups.map((group) => (
        <div className="about-control-group" key={group.title}>
          <div className="about-control-group-title">{group.title}</div>
          {group.controls.map((control) => (
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
        </div>
      ))}
      <button className="video-reset" type="button" onClick={onReset}>
        λ
      </button>
      <code>{cssText}</code>
    </aside>
  );
}

function Projects({ onOpenModule, initialModuleId, onActiveModuleChange }) {
  const sectionRef = useRef<HTMLElement | null>(null);
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
  const coverflowUnlockTimerRef = useRef<number | null>(null);
  const [coverflowAnimating, setCoverflowAnimating] = useState(false);
  const shouldPreloadModuleCovers = useLoadNearViewport(sectionRef, "400px 0px");

  useEffect(() => {
    localStorage.setItem("moduleImageSettings", JSON.stringify(imageSettings));
  }, [imageSettings]);

  useEffect(() => () => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
    }
    if (coverflowUnlockTimerRef.current) {
      window.clearTimeout(coverflowUnlockTimerRef.current);
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
    wheelLockedUntilRef.current = performance.now() + 900;
  };

  const startCoverflowAnimationLock = () => {
    setCoverflowAnimating(true);
    if (coverflowUnlockTimerRef.current) {
      window.clearTimeout(coverflowUnlockTimerRef.current);
    }
    coverflowUnlockTimerRef.current = window.setTimeout(() => {
      setCoverflowAnimating(false);
      coverflowUnlockTimerRef.current = null;
    }, 900);
  };

  const releaseCoverflowAnimationLock = () => {
    if (coverflowUnlockTimerRef.current) {
      window.clearTimeout(coverflowUnlockTimerRef.current);
      coverflowUnlockTimerRef.current = null;
    }
    setCoverflowAnimating(false);
  };

  const getCircularOffset = (index, currentIndex = activeModuleIndexRef.current) => {
    const total = portfolioModules.length;
    let offset = index - currentIndex;
    if (offset >= total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  const shiftCoverflow = (direction) => {
    if (isWheelLocked() || openingModuleId || coverflowAnimating) return false;
    const currentIndex = activeModuleIndexRef.current;
    const nextIndex = (currentIndex + direction + portfolioModules.length) % portfolioModules.length;
    if (nextIndex === currentIndex) return false;
    lockWheel();
    startCoverflowAnimationLock();
    wheelDeltaRef.current = 0;
    wheelDirectionRef.current = 0;
    activeModuleIndexRef.current = nextIndex;
    setActiveModuleIndex(nextIndex);
    setSelectedModuleId(portfolioModules[nextIndex].id);
    onActiveModuleChange?.(portfolioModules[nextIndex].id);
    return true;
  };

  const selectCoverflowIndex = (index) => {
    if (isWheelLocked() || openingModuleId || coverflowAnimating || index === activeModuleIndexRef.current) return false;
    lockWheel();
    startCoverflowAnimationLock();
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

  const preloadModuleNeighborhood = (index) => {
    [-1, 0, 1].forEach((step) => {
      const module = portfolioModules[(index + step + portfolioModules.length) % portfolioModules.length];
      if (module) preloadModuleCover(module);
    });
  };

  useEffect(() => {
    if (!shouldPreloadModuleCovers) return;
    preloadModuleNeighborhood(activeModuleIndex);
  }, [activeModuleIndex, shouldPreloadModuleCovers]);

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
    <section ref={sectionRef} className={`section projects${openingModuleId ? " is-route-exiting" : ""}`} id="work">
      <div className="container">
        <div className="section-head projects-head">
          <h2>产品渲染、产品动态</h2>
        </div>

        <div
          className={`coverflow-shell${openingModuleId ? " is-opening" : ""}`}
          ref={coverflowRef}
          role="region"
          aria-label="作品 Coverflow 轮播，可使用方向键或拖拽切换"
          tabIndex={0}
          onKeyDown={handleCoverflowKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <div className="coverflow-track" aria-label="作品模块目录">
            {portfolioModules.map((module, index) => {
              const offset = getCircularOffset(index, activeModuleIndex);
              const absOffset = Math.abs(offset);
              const getCardMotionState = (cardOffset) => {
                if (cardOffset === 0) {
                  return { x: 0, scale: 1, opacity: 1, filter: "brightness(1)", zIndex: 5 };
                }
                if (cardOffset === -1) {
                  return { x: -250, scale: 0.82, opacity: 0.58, filter: "brightness(0.5)", zIndex: 4 };
                }
                if (cardOffset === 1) {
                  return { x: 250, scale: 0.82, opacity: 0.58, filter: "brightness(0.5)", zIndex: 4 };
                }
                if (cardOffset === -2) {
                  return { x: -430, scale: 0.68, opacity: 0.25, filter: "brightness(0.3)", zIndex: 2 };
                }
                if (cardOffset === 2) {
                  return { x: 430, scale: 0.68, opacity: 0.25, filter: "brightness(0.3)", zIndex: 2 };
                }

                return {
                  x: cardOffset < 0 ? -560 : 560,
                  scale: 0.58,
                  opacity: 0,
                  filter: "brightness(0.22)",
                  zIndex: 1,
                };
              };
              const cardMotionState = getCardMotionState(offset);
              const cardStyle = {
                zIndex: cardMotionState.zIndex,
                pointerEvents: absOffset > 2 || coverflowAnimating ? "none" as const : "auto" as const,
                transform: `translate(-50%, -50%) translateX(${cardMotionState.x}px) scale(${cardMotionState.scale})`,
                opacity: cardMotionState.opacity,
                filter: cardMotionState.filter,
              };

              return (
                <button
                  className={`coverflow-card${index === activeModuleIndex ? " is-active" : ""}${openingModuleId === module.id ? " is-opening-target" : ""}${imagePanelOpen && module.id === selectedModuleId ? " tuning-selected" : ""}`}
                  type="button"
                  key={module.id}
                  data-index={index}
                  style={cardStyle}
                  onTransitionEnd={(event) => {
                    if (event.propertyName === "transform" && index === activeModuleIndexRef.current) {
                      releaseCoverflowAnimationLock();
                    }
                  }}
                  aria-current={index === activeModuleIndex ? "true" : undefined}
                  aria-label={`${module.title}Ŀҳ`}
                  onClick={() => {
                    if (suppressClickRef.current) {
                      suppressClickRef.current = false;
                      return;
                    }
                    if (coverflowAnimating) return;
                    const currentIndex = activeModuleIndexRef.current;
                    if (index === currentIndex) {
                      beginModuleOpen(module);
                      return;
                    }
                    shiftCoverflow(getCircularOffset(index, currentIndex) > 0 ? 1 : -1);
                  }}
                >
                  <PortfolioMedia item={{ ...getModuleCoverItem(module), title: module.title, playPreview: false }} preview style={getModuleMediaStyle(module.id)} />
                  {imagePanelOpen && module.id === selectedModuleId && <span className="module-tuning-badge">ڵ</span>}
                  <div className="module-card-copy coverflow-card-copy">
                    <span>{module.tag}</span>
                    <h3>{module.title}</h3>
                  </div>
                </button>
              );
            })}
            <div
              className="coverflow-glow"
              aria-hidden="true"
              style={{ opacity: openingModuleId ? 0.24 : 0.68 }}
            />
          </div>
          {openingModuleId && <div className="route-transition-scrim" aria-hidden="true" />}
        </div>
      </div>
      {shouldShowTuningControls() && (
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
      )}
    </section>
  );
}

function ModuleImageTuningPanel({ modules, selectedModuleId, onSelectModule, open, onOpenChange, settings, onChange, onReset }) {
  const selectedModule = modules.find((module) => module.id === selectedModuleId) || modules[0];
  const controls = [
    { key: "x", label: "ˮƽλ", min: 0, max: 100, step: 1, suffix: "%" },
    { key: "y", label: "ֱλ", min: 0, max: 100, step: 1, suffix: "%" },
    { key: "scale", label: "ͼƬС", min: 0.7, max: 1.8, step: 0.01, suffix: "x" },
  ];

  if (!open) {
    return (
      <button className="module-image-tuning-toggle" type="button" onClick={() => onOpenChange(true)}>
        ͼƬ̨
      </button>
    );
  }

  return (
    <aside className="module-image-tuning-panel" aria-label="ƷģͼƬ̨">
      <div className="video-tuning-header">
        <div className="video-tuning-title">ƷͼƬ̨</div>
        <button className="video-collapse" type="button" onClick={() => onOpenChange(false)}></button>
      </div>
      <div className="module-image-current">
        <span>ǰ</span>
        <strong>{selectedModule?.title}</strong>
      </div>
      <label className="module-image-select">
        <span>ѡͼƬ</span>
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
        õǰͼƬ
      </button>
    </aside>
  );
}

function LazyPortfolioVideo({ item, preview = false, style = undefined }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const shouldAutoPreview = preview && item.playPreview !== false;

  useEffect(() => {
    if (shouldLoad) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px", threshold: 0.01 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      className="portfolio-media"
      style={style}
      controls={!preview}
      autoPlay={shouldLoad && shouldAutoPreview}
      loop={shouldAutoPreview}
      muted
      playsInline
      preload={shouldLoad ? "metadata" : "none"}
    >
      {shouldLoad ? <source src={item.src} type="video/mp4" /> : null}
    </video>
  );
}

function LazyPortfolioImage({ item, label, style = undefined }) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(item.loading === "eager");

  useEffect(() => {
    if (shouldLoad) return undefined;
    const image = imageRef.current;
    if (!image) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px", threshold: 0.01 },
    );

    observer.observe(image);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <img
      ref={imageRef}
      className="portfolio-media"
      style={style}
      src={shouldLoad ? item.src : undefined}
      alt={label}
      loading={item.loading || "lazy"}
      decoding="async"
      width={item.width}
      height={item.height}
    />
  );
}

function PortfolioMedia({ item, preview = false, style = undefined }) {
  const label = item.title || item.original || "portfolio media";

  if (item.media === "video") {
    return <LazyPortfolioVideo item={item} preview={preview} style={style} />;
  }

  return <LazyPortfolioImage item={item} label={label} style={style} />;
}

function LongformShowcase({ module, onPreview }) {
  const columns = module.works.reduce(
    (result, item, index) => {
      const meta = longformImageMeta[item.src] || {};
      const visualHeight = meta.width && meta.height ? meta.height / meta.width : 1;
      const columnIndex =
        index < 3
          ? index
          : result.heights.indexOf(Math.min(...result.heights));

      result.columns[columnIndex].push({ item, index });
      result.heights[columnIndex] += visualHeight;
      return result;
    },
    { columns: [[], [], []], heights: [0, 0, 0] }
  ).columns;

  const renderLongformItem = ({ item, index }) => {
    if (!item) return null;
    const meta = longformImageMeta[item.src] || {};
    const isFirst = index === 0;
    const enrichedItem = {
      ...item,
      ...meta,
      loading: "lazy",
    };
    const longformStyle = {
      ...(meta.width && meta.height ? { "--longform-ratio": `${meta.width} / ${meta.height}` } : {}),
      order: index,
    } as React.CSSProperties;

    return (
      <article
        className="longform-piece"
        key={item.src}
        role="button"
        tabIndex={0}
        style={longformStyle}
        onClick={() => onPreview(item)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onPreview(item);
          }
        }}
      >
        <PortfolioMedia item={enrichedItem} />
      </article>
    );
  };

  return (
    <div className="longform-showcase" aria-label="长图详情页作品">
      <div className="longform-masonry" aria-label="长图详情页瀑布展示">
        {columns.map((column, columnIndex) => (
          <div className="longform-column" key={`longform-column-${columnIndex}`}>
            {column.map(renderLongformItem)}
          </div>
        ))}
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
      name: `${selectedGroup.name} `,
      items: selectedGroup.items.map((item, index) => ({
        ...item,
        id: `${item.id}-copy-${index + 1}-${Date.now()}`,
      })),
    };
    replaceGroups([...groups, nextGroup]);
    setSelectedGroupId(nextGroup.id);
  };

  const deleteGroup = () => {
    if (!selectedGroup || !window.confirm(`ȷɾ ${selectedGroup.name} `)) return;
    replaceGroups(groups.filter((group) => group.id !== selectedGroup.id));
  };

  const addItem = () => {
    if (!selectedGroup) return;
    const nextIndex = countCommerceWorks(groups) + 1;
    updateGroup({ items: [...selectedGroup.items, createEmptyCommerceItem(nextIndex)] });
  };

  const deleteItem = (itemIndex) => {
    if (!selectedGroup || !window.confirm("ȷɾƷͼƬ")) return;
    const nextItems = selectedGroup.items.filter((_, index) => index !== itemIndex);
    updateGroup({
      items: nextItems,
      defaultActiveIndex: Math.min(selectedGroup.defaultActiveIndex, Math.max(nextItems.length - 1, 0)),
    });
  };

  const uploadImage = async (file, itemIndex) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) {
      alert("ֻ֧ JPGPNGWebPAVIF ͼƬ");
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
      if (!response.ok) throw new Error(payload.error || "ϴʧ");
      updateItem(itemIndex, { image: payload.src, alt: file.name.replace(/\.[^.]+$/, "") });
    } catch (error) {
      alert(`ͼƬʱԤϴʧܣ${error instanceof Error ? error.message : String(error)}`);
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
      if (!parsed.groups.length) throw new Error("JSON ûƷ顣");
      replaceGroups(parsed.groups);
      setSelectedGroupId(parsed.groups[0].id);
    } catch (error) {
      alert(`ʧܣ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const closeEditor = () => {
    if (dirty && !window.confirm("δ޸ģǷ")) return;
    onClose();
  };

  return (
    <aside className="commerce-works-editor" aria-label="Ʒ༭̨">
      <div className="commerce-works-editor-head">
        <div>
          <span>LOCAL EDITOR</span>
          <h4>ƷͼƬ̨</h4>
        </div>
        <button type="button" onClick={closeEditor}>ر</button>
      </div>

      <div className="commerce-editor-section">
        <label>Ʒ</label>
        <div className="commerce-group-list">
          {groups.map((group, index) => (
            <button
              type="button"
              key={group.id}
              className={group.id === selectedGroup?.id ? "is-active" : ""}
              onClick={() => setSelectedGroupId(group.id)}
            >
              {index + 1} <small>{group.name}</small>
            </button>
          ))}
        </div>
        <div className="commerce-editor-buttons">
          <button type="button" onClick={addGroup}>Ʒ</button>
          <button type="button" onClick={copyGroup} disabled={!selectedGroup}>Ʒ</button>
          <button type="button" onClick={deleteGroup} disabled={!selectedGroup}>ɾƷ</button>
          <button type="button" onClick={() => moveGroup(-1)} disabled={selectedGroupIndex <= 0}></button>
          <button type="button" onClick={() => moveGroup(1)} disabled={selectedGroupIndex >= groups.length - 1}></button>
        </div>
      </div>

      {selectedGroup && (
        <>
          <div className="commerce-editor-section">
            <label>ǰ</label>
            <input
              value={selectedGroup.name}
              onChange={(event) => updateGroup({ name: event.target.value })}
              placeholder=""
            />
            <label>ĬչͼƬ</label>
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
              <label>ͼƬ</label>
              <button type="button" onClick={addItem}>ͼƬ</button>
            </div>
            <div className="commerce-item-editor-list">
              {selectedGroup.items.map((item, itemIndex) => (
                <div className="commerce-item-editor" key={item.id}>
                  <img src={item.image || "/portfolio-full/commerce/commerce-01.jpg"} alt={item.alt} />
                  <div>
                    <strong>{item.alt || item.id}</strong>
                    <input
                      value={item.alt}
                      onChange={(event) => updateItem(itemIndex, { alt: event.target.value })}
                      placeholder=""
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
                        ͼƬ
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/avif"
                          onChange={(event) => uploadImage(event.target.files?.[0], itemIndex)}
                        />
                      </label>
                      <button type="button" onClick={() => moveItem(itemIndex, -1)}></button>
                      <button type="button" onClick={() => moveItem(itemIndex, 1)}></button>
                      <button type="button" onClick={() => updateGroup({ defaultActiveIndex: itemIndex })}>Ĭչ</button>
                      <button type="button" onClick={() => deleteItem(itemIndex)}>ɾ</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="commerce-editor-actions sticky">
        <button type="button" onClick={onSave} disabled={saving}>{saving ? "..." : ""}</button>
        <button type="button" onClick={onReset}>ȡ޸</button>
        <button type="button" onClick={() => selectedGroup && updateGroup({
          items: selectedGroup.items.map((item) => ({ ...item, objectFit: "cover", objectPositionX: 50, objectPositionY: 50 })),
          defaultActiveIndex: 0,
        })}>õǰ</button>
        <button type="button" onClick={exportJson}>JSON</button>
        <label className="commerce-upload-button">
          JSON
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
    title: project.title || `Ʒ ${project.id.replace("project-", "")}`,
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
          <h1>没有找到对应的作品页面</h1>
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
      alert("ʧܣͼƬݿ̫ȵ JSON ݣʹýСͼƬ");
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
          {!edit && import.meta.env.DEV && ["localhost", "127.0.0.1"].includes(window.location.hostname) && (
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
          aria-label="ͼƬС"
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
        alert("ʧܣJSON ʽȷ");
      }
    };
    reader.readAsText(file);
  };

  return (
    <aside className="commerce-project-editor">
      <div className="commerce-editor-head">
        <strong>详情页编辑控制台</strong>
        <span>{selectedImage?.name || "δѡͼƬ"}</span>
      </div>

      <label>
        替换当前图片
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
        ͼƬ
        <input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={(event) => addFiles(event.target.files)} />
      </label>

      {selectedImage && (
        <>
          <CommerceEditorRange label="X 偏移" value={selectedImage.x} min={-78} max={78} step={1} onChange={(value) => updateSelected({ x: value })} />
          <CommerceEditorRange label="Y 偏移" value={selectedImage.y} min={-78} max={78} step={1} onChange={(value) => updateSelected({ y: value })} />
          <CommerceEditorRange label="宽度" value={selectedImage.width} min={20} max={190} step={1} suffix="%" onChange={(value) => updateSelected({ width: value })} />
          <CommerceEditorRange label="等比缩放" value={selectedImage.scale} min={0.25} max={3} step={0.05} onChange={(value) => updateSelected({ scale: value })} />

          <div className="commerce-editor-buttons">
            <button type="button" onClick={() => updateSelected({ y: selectedImage.y - 4 })}></button>
            <button type="button" onClick={() => updateSelected({ y: selectedImage.y + 4 })}></button>
            <button type="button" onClick={() => updateSelected({ x: selectedImage.x - 4 })}></button>
            <button type="button" onClick={() => updateSelected({ x: selectedImage.x + 4 })}></button>
            <button type="button" onClick={() => updateSelected({ x: 0, y: 0 })}></button>
            <button type="button" onClick={() => updateSelected({ x: 0, y: 0, width: 100, scale: 1 })}>λ</button>
            <button type="button" onClick={() => updateSelected({ scale: selectedImage.scale + 0.1 })}>Ŵ</button>
            <button type="button" onClick={() => updateSelected({ scale: selectedImage.scale - 0.1 })}>С</button>
            <button type="button" onClick={() => updateSelected({ width: 100, scale: 1 })}>ָԭʼߴ</button>
            <button type="button" onClick={() => updateSelected({ width: 100, x: 0, y: 0 })}>Ӧ</button>
            <button type="button" onClick={() => updateSelected({ width: 100 })}></button>
          </div>

          <div className="commerce-editor-buttons">
            <button type="button" onClick={() => moveSelected(-1)}>ƶ</button>
            <button type="button" onClick={() => moveSelected(1)}>ƶ</button>
            <button type="button" onClick={deleteSelected}>ɾͼƬ</button>
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
        <button type="button" onClick={onSave}></button>
        <button type="button" onClick={onCancel}>ȡ</button>
        <button type="button" onClick={onReset}></button>
        <button type="button" onClick={exportConfig}></button>
        <label>
          
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
  const hideRenderingLabels = module.id === "rendering";
  const hideCommerceLabels = module.id === "commerce";
  const hideAigcShowcase = module.id === "aigc";
  const hideLongformShowcase = module.id === "longform";
  const hideMotionHero = module.id === "motion";
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
      if (!response.ok) throw new Error(payload.error || "ʧ");
      setSavedCommerceGroups(cloneCommerceGroups(commerceGroups));
    } catch (error) {
      alert(`ʧܣ${error instanceof Error ? error.message : String(error)}ʹáJSONݵǰݡ`);
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

      {!hideRenderingLabels && !hideAigcShowcase && !hideLongformShowcase && !hideMotionHero && (
        <section className="project-page-hero-section">
          <div className="container">
            {!hideMotionHero && (
              <>
                <button className="module-back" type="button" onClick={onBack}>
                  返回作品模块
                </button>

                <div className="module-page-hero">
                  <div>
                    <span className="section-kicker">{module.tag}</span>
                    <h2 ref={titleRef} tabIndex={-1}>{module.title}</h2>
                  </div>
                  {!hideCommerceLabels && <p>{module.desc}</p>}
                </div>
              </>
            )}

            {isCommerceModule ? (
              <Suspense fallback={<div className="commerce-showcase" aria-hidden="true" />}>
                <CommerceShowcase module={module} />
              </Suspense>
            ) : !hideAigcShowcase ? (
              <div className="module-page-cover">
                <PortfolioMedia item={{ ...getModuleCoverItem(module), title: module.title }} preview />
              </div>
            ) : null}
          </div>
        </section>
      )}

      <section className="project-page-works">
        <div className="container">
          {!hideRenderingLabels && !hideCommerceLabels && !hideAigcShowcase && !hideLongformShowcase && !hideMotionHero && (
            <div className="module-subhead">
              <span>{isCommerceModule ? `${countCommerceWorks(commerceGroups)} Works` : module.meta}</span>
              <h3>Works</h3>
            </div>
          )}

          {isCommerceModule ? (
            <CommerceWorksAccordion groups={commerceGroups} onOpenProject={onOpenCommerceProject} />
          ) : hideLongformShowcase ? (
            <LongformShowcase module={module} onPreview={setPreviewItem} />
          ) : (
            <div className="portfolio-grid module-work-grid flat-work-grid">
              {module.works.map((item, index) => (
                <article
                  className={`portfolio-card ${getMediaClass(item)}`}
                  key={item.src}
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
      {isCommerceModule && !commerceEditorOpen && import.meta.env.DEV && ["localhost", "127.0.0.1"].includes(window.location.hostname) && (
        <button className="commerce-works-edit-toggle" type="button" onClick={openCommerceEditor}>
          ༭Ʒ
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
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionScrubReveal(sectionRef, "strengths");

  return (
    <section ref={sectionRef} className="section strengths" id="strength">
      <div className="container">
        <div className="section-head compact">
          <h2>从“想法”到“上线素材”的连续生产能力。</h2>
        </div>
        <div className="strength-grid">
          {strengths.map(({ icon: Icon, title, text }) => (
            <div
              className="strength-card"
              key={title}
            >
              <div className="icon-box">
                <Icon size={24} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactEnd() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionScrubReveal(sectionRef, "contact");

  return (
    <section ref={sectionRef} className="end-contact" id="contact">
      <div className="container end-layout">
        <div className="end-heading-motion">
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


























