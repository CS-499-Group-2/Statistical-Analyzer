import React from "react";
import { useQuery } from "@tanstack/react-query";
import useCloudStore from "../../stores/cloud-store";
import { GetFileResponse, getFiles } from "../../file-handling/cloud";
import { Button, Group, LoadingOverlay, Modal, Paper, Stack, Text, Title } from "@mantine/core";

export interface FileListProps {
  open: boolean;
  onClose: () => void;
  onSelected: (file: string) => void;
  onDeleted: (file: string) => void;
}

export const FileList = (props: FileListProps) => {
  const currentUser = useCloudStore(state => state.user);

  const { data, isFetching } = useQuery({
    queryKey: ["files", currentUser?.uid],
    queryFn: getFiles,
    enabled: props.open,
  });

  const renderFile = (file: GetFileResponse) => {
    return (
      <Paper p="md" shadow="sm" key={file.filename}>
        <Stack>
          <Group>
            <Title align={"center"} order={3} mb={5}>{file.filename}</Title>
            <Text align={"center"}>{new Date(file.data.lastModified).toLocaleString()}</Text>
          </Group>
          <Group position={"center"}>
            <Button color={"green"} onClick={() => props.onSelected(file.filename)}>Select</Button>
            <Button color={"red"} onClick={() => props.onDeleted(file.filename)}>Delete</Button>
          </Group>
        </Stack>
      </Paper>
    );
  };

  return (
    <Modal opened={props.open} onClose={props.onClose} title="Files" size="md" centered>
      <LoadingOverlay zIndex={9999} visible={isFetching} overlayBlur={3}/>
      {data && data.map(renderFile)}
    </Modal>
  );
};
