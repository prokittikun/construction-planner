import { axiosAPI } from "@/utils/axios";

export interface GetJobResponse {
  data: Data;
  message: string;
}

export interface Data {
  job_id: string;
  name: string;
  description: string;
  unit: string;
  materials: Material[];
}

export interface Material {
  material_id: string;
  name: string;
  unit: string;
  quantity: number;
}

export type GetJobProps = {
  job_id: string;
};

const getJob = async (props: GetJobProps) => {
  try {
    const res = await axiosAPI.get<GetJobResponse>("/jobs/" + props.job_id);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getJob;