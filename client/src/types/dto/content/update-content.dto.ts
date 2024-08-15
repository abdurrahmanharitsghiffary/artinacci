import z from "zod";
import { createContentDto } from "./create-content.dto";

export const updateContentDto = createContentDto.partial();

export type UpdateContentDTO = z.infer<typeof updateContentDto>;
