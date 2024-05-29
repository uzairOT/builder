import { Skeleton, Stack } from "@mui/material";
import React from "react";

const ProgressCardLoader = () => {
  return (
    <Stack direction={"row"} width={"100%"}>
      <Stack width={"50%"} p={1}>
        <Stack>
          <Skeleton
            sx={{
              borderTopLeftRadius: "14px",
              borderTopRightRadius: "14px",
              borderBottomRadius: 0, // Set bottom corners to 0 for no rounding
            }}
            variant="rectangle"
            width={"100%"}
            height={"100px"}
          />
        </Stack>
        <Stack direction={"row"} width={"100%"} gap={0.2} pt={0.2}>
          <>
            <Skeleton
            //   sx={{
            //     borderTopLeftRadius: "14px",
            //     borderBottomLeftRadius: "14px",
                
            //   }}
              variant="rectangle"
              width={"100%"}
              height={"200px"}
            />
          </>
          <>
            <Skeleton
            //  sx={{
            //     borderTopRightRadius: "14px",
            //     borderBottomRightRadius: "14px",
                
            //   }}
              variant="rectangle"
              width={"100%"}
              height={"200px"}
            />
          </>
        </Stack>
        <Stack pt={0.2}>
          <>
            <Skeleton
              sx={{
                borderBottomLeftRadius: "14px",
                borderBottomRightRadius: "14px",
                
              }}
              variant="rounded"
              width={"100%"}
              height={"300px"}
            />
          </>
        </Stack>
      </Stack>
      <Stack width={"50%"} p={1}>
        <Stack>
          <Skeleton
            sx={{
              borderTopLeftRadius: "14px",
              borderTopRightRadius: "14px",
              borderBottomRadius: 0, // Set bottom corners to 0 for no rounding
            }}
            variant="rectangle"
            width={"100%"}
            height={"100px"}
          />
        </Stack>
        <Stack direction={"row"} width={"100%"} gap={0.2} pt={0.2}>
          <>
            <Skeleton
            //   sx={{
            //     borderTopLeftRadius: "14px",
            //     borderBottomLeftRadius: "14px",
                
            //   }}
              variant="rectangle"
              width={"100%"}
              height={"200px"}
            />
          </>
          <>
            <Skeleton
            //  sx={{
            //     borderTopRightRadius: "14px",
            //     borderBottomRightRadius: "14px",
                
            //   }}
              variant="rectangle"
              width={"100%"}
              height={"200px"}
            />
          </>
        </Stack>
        <Stack pt={0.2}>
          <>
            <Skeleton
              sx={{
                borderBottomLeftRadius: "14px",
                borderBottomRightRadius: "14px",
                
              }}
              variant="rounded"
              width={"100%"}
              height={"300px"}
            />
          </>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProgressCardLoader;
