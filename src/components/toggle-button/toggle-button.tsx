import React from "react";
import { useMantineColorScheme, SegmentedControl, Group, Center, Box } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useThemeStore } from "../theme-store/theme-store";


export let theme; 

export function SegmentedToggle() {
  theme = useThemeStore(state => state.isDark);

  return (
    <Group position="center" my="xl">
      <SegmentedControl
        value={theme ? "dark" : "light"}
        onChange={(value) => {
          useThemeStore.setState({ isDark: value === "dark" });
        }
        }
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