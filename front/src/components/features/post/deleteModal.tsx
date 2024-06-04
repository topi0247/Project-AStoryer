import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";
import { ChangeEventHandler } from "react";

export default function DeleteModal({
  isDeleteConfirmation,
  setIsDeleteConfirmation,
  deleteConfirmationError,
  handleDeleteSubmit,
  handleBack,
}: {
  isDeleteConfirmation: boolean;
  setIsDeleteConfirmation: ChangeEventHandler<HTMLInputElement>;
  deleteConfirmationError: string;
  handleDeleteSubmit: () => void;
  handleBack: () => void;
}) {
  const t_EditGeneral = useTranslations("EditGeneral");
  const t_General = useTranslations("General");
  return (
    <>
      <h3 className="text-xl text-center my-4">
        {t_EditGeneral("deleteModalTItle")}
      </h3>
      <p className="text-center text-sm">
        {t_EditGeneral("deleteModalAttention")}
      </p>
      <div className="my-4 flex flex-col justify-center items-center">
        <Mantine.Checkbox
          label={t_EditGeneral("deleteCheckLabel")}
          size="md"
          radius="xl"
          color="red"
          checked={isDeleteConfirmation}
          onChange={setIsDeleteConfirmation}
        />
        {deleteConfirmationError && (
          <p className="text-red-400">{deleteConfirmationError}</p>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-4 my-8">
        <Mantine.Button
          type="button"
          className="bg-red-400 hover:bg-red-600 transition-all text-white px-8 py-1"
          onClick={handleDeleteSubmit}
        >
          {t_EditGeneral("deleteButton")}
        </Mantine.Button>
        <Mantine.Button
          type="button"
          className="tracking-wider text-black hover:text-black hover:text-opacity-50 transition-all bg-transparent hover:bg-transparent"
          onClick={handleBack}
        >
          {t_General("back")}
        </Mantine.Button>
      </div>
    </>
  );
}
