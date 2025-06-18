import { Chip, Tooltip } from "@heroui/react";
import { t } from "i18next";
import { FC } from "react";

type FileType = {
  type: string;
  count: number;
  color: string;
};

type FileCollectionChartProps = {
  fileData: FileType[];
  allFiles: number;
  receivedFiles: number;
};

export const FileCollectionChart: FC<FileCollectionChartProps> = ({
  fileData,
  allFiles,
  receivedFiles,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <span className="text-default-foreground text-xs">
          <Chip variant="flat" radius="full" size="sm" className="me-1">
            {receivedFiles}
          </Chip>
          {t("shared.receivedFilesFrom")}
          <Chip variant="flat" radius="full" size="sm" className="mx-1">
            {allFiles}
          </Chip>
          {t("shared.wantedFiles")}
        </span>
      </div>

      <div className="relative h-12 rounded-lg overflow-hidden ltr">
        {fileData.map((file, index, array) => {
          // Calculate the percentage width and position
          const percentage = (file.count / receivedFiles) * 100;
          const previousWidth = array
            .slice(0, index)
            .reduce((sum, item) => sum + (item.count / receivedFiles) * 100, 0);

          return (
            <Tooltip
              key={file.type}
              content={`${file.type}: ${file.count} (${percentage.toFixed(1)}%)`}
              placement="top"
            >
              <div
                className="absolute h-full cursor-pointer transition-all hover:opacity-90"
                style={{
                  backgroundColor: file.color,
                  width: `${percentage}%`,
                  left: `${previousWidth}%`,
                }}
              />
            </Tooltip>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4 mt-2 ltr">
        {fileData.map((file) => (
          <div key={file.type} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: file.color }}
            />
            <span className="text-sm">
              {file.type} <span className="font-medium">{file.count}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
