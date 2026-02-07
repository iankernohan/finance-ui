import {
  Box,
  Button,
  Chip,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { iconMap } from "../../utils/helpers";
import Parcel from "../UI/Parcel";
import type { Category } from "../../Types/Transaction";
import { useLayoutEffect, useRef, useState } from "react";
import SubCategoryChip from "./SubCategoryChip";
import { addSubCategory } from "../Data/category";
import { useQueryClient } from "@tanstack/react-query";

export default function Category({ category }: { category: Category }) {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState("");
  const ref = useRef<HTMLElement>(null);
  const hiddenRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (ref.current && hiddenRef.current) {
      if (open) {
        setHeight(ref.current.clientHeight + hiddenRef.current.clientHeight);
      } else {
        setHeight(ref.current.clientHeight);
      }
    }
  }, [open, add, ref.current?.clientHeight, hiddenRef.current?.clientHeight]);

  async function handleAddSubCategory() {
    await addSubCategory(newSubCategory, category.id);
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    setNewSubCategory("");
    setAdd(false);
  }

  return (
    <Parcel
      sx={{
        padding: "1.2rem",
        display: "grid",
        justifyContent: "normal",
        height: height,
        overflow: "hidden",
        transition: "height 0.3s",
        boxSizing: "content-box",
      }}
    >
      <Box
        onClick={() => setOpen((curr) => !curr)}
        ref={ref}
        sx={{
          alignSelf: "start",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          svg: {
            width: "40px",
            height: "40px",
          },
        }}
      >
        {iconMap[category.name] ?? iconMap["Unknown"]}
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "200",
            transform: "translateY(10px)",
          }}
        >
          {category.name}
        </Typography>
      </Box>
      <Box ref={hiddenRef} sx={{ display: "grid" }}>
        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
            // alignItems: "start",
          }}
        >
          {(category.subCategories?.length ?? 0 > 0) ? (
            category.subCategories?.map((subcategory) => (
              <SubCategoryChip subCategory={subcategory} />
            ))
          ) : (
            <Typography>No Sub-Categories</Typography>
          )}
          <Chip
            onClick={() => setAdd((curr) => !curr)}
            sx={{ background: theme.palette.primary.dark }}
            label={add ? "x" : "+"}
          />
        </Box>
        <Box
          sx={{
            height: add ? "100px" : "0px",
            overflow: "hidden",
            width: "fit-content",
            margin: "auto",
            marginTop: "1rem",
            display: "grid",
            placeItems: "center",
            // transition: "height 0.3s",
          }}
        >
          <TextField
            value={newSubCategory}
            onChange={(e) => setNewSubCategory(e.target.value)}
            sx={{
              height: "50px",
              padding: "0",
              ".MuiInputBase-root": {
                height: "50px",
              },
            }}
          />
          <Button
            onClick={handleAddSubCategory}
            disabled={newSubCategory === ""}
            variant="outlined"
          >
            Add
          </Button>
        </Box>
      </Box>
    </Parcel>
  );
}
