import { Tooltip } from "@heroui/react";
import { FC } from "react";

interface FileType {
  type: string;
  count: number;
  color: string;
}

interface FileCollectionChartProps {
  fileData: FileType[];
}

export const FileCollectionChart: FC<FileCollectionChartProps> = ({
  fileData,
}) => {
  const totalFiles = fileData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="flex flex-col gap-2">
      {/* <div className="flex justify-between items-center">
        <span className="text-default-500 text-sm">
          {totalFiles} total files
        </span>
      </div> */}

      <div className="relative h-12 rounded-lg overflow-hidden">
        {fileData.map((file, index, array) => {
          // Calculate the percentage width and position
          const percentage = (file.count / totalFiles) * 100;
          const previousWidth = array
            .slice(0, index)
            .reduce((sum, item) => sum + (item.count / totalFiles) * 100, 0);

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

      <div className="flex flex-wrap gap-4 mt-2">
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
