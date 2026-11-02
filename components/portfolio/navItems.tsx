"use client";

import { IoHome, IoPerson, IoFolderOpen, IoMail } from "react-icons/io5";
import {
  FaIdCard,
  FaBriefcase,
  FaCode,
  FaGraduationCap,
} from "react-icons/fa";

/**
 * Sumber tunggal menu navigasi.
 * Dipakai oleh SiteHeader di seluruh halaman portfolio.
 */
export const NAV_ITEMS = [
  {
    label: "Beranda",
    href: "/beranda",
    icon: <IoHome />,
  },
  {
    label: "Tentang Saya",
    href: "/tentang",
    icon: <IoPerson />,
    submenu: [
      {
        label: "Data Diri",
        href: "/tentang/data-diri",
        icon: <FaIdCard />,
      },
      {
        label: "Pengalaman",
        href: "/tentang/pengalaman",
        icon: <FaBriefcase />,
      },
      {
        label: "Keahlian",
        href: "/tentang/keahlian",
        icon: <FaCode />,
      },
      {
        label: "Pendidikan",
        href: "/tentang/pendidikan",
        icon: <FaGraduationCap />,
      },
    ],
  },
  {
    label: "Project",
    href: "/project",
    icon: <IoFolderOpen />,
  },
  {
    label: "Kontak",
    href: "/kontak",
    icon: <IoMail />,
  },
];
