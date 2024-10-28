import ControlledInputText from "@/components/Controlled/ControlledInputText";
import ControlledSelect from "@/components/Controlled/ControlledSelect";
import useGetBoqFromProject from "@/hooks/queries/boq/useGetBoqFromProject";
import useGetProject from "@/hooks/queries/project/useGetProject";
import useGetQuotationByProject from "@/hooks/queries/quotation/useGetQuotationByProject";
import useGetSuppliers from "@/hooks/queries/supplier/useGetSuppliers";
import {
  materialProjectSchema,
  type MaterialProjectSchemaType,
} from "@/schemas/project/materialProject/material-project.schama";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text } from "@mantine/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  type: "create" | "edit";
  onFinish?: (data: MaterialProjectSchemaType) => void;
  data?: MaterialProjectSchemaType;
  project_id: string;
}

export default function MaterialProjectForm(props: Props) {
  const getSuppliers = useGetSuppliers();
  const getProject = useGetProject({ id: props.project_id });
  const getBoqFromProject = useGetBoqFromProject({
    project_id: props.project_id,
  });
  const getQuotationByProject = useGetQuotationByProject({
    project_id: props.project_id,
  });

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<MaterialProjectSchemaType>({
    resolver: zodResolver(materialProjectSchema),
  });

  const onFinish = (data: MaterialProjectSchemaType) => {
    console.log(data);
    props.onFinish?.(data);
  };

  useEffect(() => {
    if (props.data) {
      setValue("supplier_id", props.data.supplier_id);
      setValue("material_id", props.data.material_id);
      setValue("estimated_price", props.data.estimated_price);
      setValue("actual_price", props.data.actual_price);
    }
  }, [props.data, setValue]);

  const isEstimatedPriceValid = () => {
    if (getBoqFromProject.data?.data.status !== "draft") {
      return false;
    }
    return true;
  };

  const isActualPriceValid = () => {
    if (getBoqFromProject.data?.data.status !== "approved") {
      return false;
    }
    if (getQuotationByProject.data?.data.status !== "approved") {
      return false;
    }
    if (getProject.data?.data.status === "completed") {
      return false;
    }
    return true;
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onFinish)}>
      <Text fw={700}>{props.data?.name}</Text>
      <ControlledInputText
        control={control}
        name="estimated_price"
        props={{
          label: "ราคาประเมิน",
          placeholder: "กรอกราคาประเมิน",
          withAsterisk: true,
          disabled: !isEstimatedPriceValid(),
        }}
      />
      <ControlledSelect
        control={control}
        name="supplier_id"
        props={{
          label: "ซัพพลายเออร์",
          placeholder: "เลือกซัพพลายเออร์",
          withAsterisk: true,
          data: getSuppliers.data?.data.suppliers.map((item) => ({
            value: item.id,
            label: item.name,
          })),
          searchable: true,
          disabled: !isActualPriceValid(),
        }}
      />
      <ControlledInputText
        control={control}
        name="actual_price"
        props={{
          label: "ราคาซื้อจริง",
          placeholder: "กรอกราคาซื้อจริง",
          withAsterisk: true,
        }}
      />
      <Button type="submit">
        {props.type === "create" ? "บันทึก" : "บันทึก"}
      </Button>
    </form>
  );
}