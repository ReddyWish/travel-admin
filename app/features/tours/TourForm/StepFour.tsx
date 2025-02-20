import { UploadIcon } from '~/shared/icons/UploadIcon';

export default function StepFour() {
  return (
    <label
      htmlFor="uploadFile1"
      className="bg-white dark:bg-gray-300 font-semibold rounded-md lg:min-w-[332px] min-w-full flex flex-col items-center justify-center cursor-pointer border border-slate-200 shadow-md lg:p-10"
    >
      <UploadIcon className="w-15 fill-color-black pb-5" />
      Upload Tour Images
      <input type="file" id="uploadFile1" className="hidden" />
      <p className="text-xs font-medium text-gray-400 mt-2">
        PNG, JPG, SVG and WEBP are allowed
      </p>
    </label>
  );
}
