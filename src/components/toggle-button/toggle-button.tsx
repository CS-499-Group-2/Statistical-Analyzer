import React from "react";
import { SegmentedControl, Group, Center, Box } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useThemeStore } from "../../stores/theme-store";

export function SegmentedToggle() {
  const theme = useThemeStore(state => state.isDark);
  const setTheme = useThemeStore(state => state.setTheme);

  return (
    <Group position="center">
      <SegmentedControl
        value={theme ? "dark" : "light"}
        color={theme ? "gray" : "green"}       
        onChange={(value) => {
          setTheme(value === "dark");
        }}
        data={[
          {
            value: "light",
            label: (
              <Center>
                <IconSun size="1rem" stroke={1.5} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
          },
          {
            value: "dark",
            label: (
              <Center>
                <IconMoon size="1rem" stroke={1.5} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
}