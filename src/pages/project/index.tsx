import ProjectCard from "@/components/Projects/ProjectCard/ProjectCard";
import { Button, Drawer, MultiSelect, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendar,
  IconFilter,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import React from "react";
import Link from "next/link";

export default function Index() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Drawer
        opened={opened}
        position="right"
        onClose={close}
        title="การค้นหาขั้นสูง"
      >
        <div className="flex flex-col gap-3">
          <MultiSelect
            searchable
            clearable
            label="สถานะโครงการ"
            placeholder="เลือกสถานะโครงการ"
            data={["วางแผน", "กำลังดำเนินการ", "Vue", "Svelte"]}
          />
          <DateInput
            label="วันที่เริ่มโครงการ"
            placeholder="เลือกวันที่เริ่มโครงการ"
            leftSection={<IconCalendar size={15} />}
          />
          <DateInput
            label="วันที่สิ้นสุดโครงการ"
            placeholder="เลือกวันที่สิ้นสุดโครงการ"
            leftSection={<IconCalendar size={15} />}
          />
        </div>
      </Drawer>
      <div className="flex flex-col gap-3">
        <Text size="xl" fw={700}>
          รายการโครงการ
        </Text>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <TextInput
              className="min-w-[400px]"
              placeholder="ค้นหา"
              leftSection={<IconSearch size={15} />}
            />
            <Button onClick={open} leftSection={<IconFilter size={15} />}>
              การค้นหาขั้นสูง
            </Button>
          </div>
          <Link href="/project/create">
            <Button leftSection={<IconPlus size={15} />}>สร้างโครงการ</Button>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[...Array(6)].map((_, index) => (
            <ProjectCard key={index} />
          ))}
        </div>
      </div>
    </>
  );
}