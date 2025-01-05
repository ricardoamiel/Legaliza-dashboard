import Icon from "@/Components/ui/icon";
import Modal from "@/Components/ui/modal";
import React, { useState } from "react";
import { UpdateUserInput, Users, ToggleProps } from "@/interfaces/types";
import { Tabs, TabButton, TabList, TabPanels } from "@/Components/ui/tabs";
import UpdatePasswordTab from "./update-password.tab";
import UpdateDataTab from "./update-data.tab";

interface Props extends ToggleProps {
  dataUsers?: Users;
  refetch: () => void;
  deleteId?: string;
  userData?: UpdateUserInput;
}

const EditCardModule: React.FC<Props> = ({
  deleteId,
  refetch,
  dataUsers,
  userData,
  ...toggle
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Modal isOpen={toggle.isOpen} onClose={toggle.onClose}>
      <div className="flex flex-col items-center justify-center gap-4 px-12 py-7">
        <div className="flex w-full justify-between text-2xl font-bold text-black dark:text-white">
          <p>Editar cuenta</p>
          <button onClick={toggle.onClose} type="button">
            <Icon name="x-marker" className="h-5 w-5" />
          </button>
        </div>
        <div className="w-full">
          <Tabs>
            <TabList>
              <TabButton
                onClick={() => setActiveIndex(0)}
                isActive={activeIndex === 0}
              >
                Datos Personales
              </TabButton>
              <TabButton
                onClick={() => setActiveIndex(1)}
                isActive={activeIndex === 1}
              >
                Cambiar Contraseña
              </TabButton>
            </TabList>
            <TabPanels>
              {activeIndex === 0 && (
                <div>
                  <UpdateDataTab
                    userData={userData}
                    deleteId={deleteId}
                    toggle={toggle}
                    refetch={refetch}
                  />
                </div>
              )}
              {activeIndex === 1 && (
                <div>
                  <UpdatePasswordTab
                    deleteId={deleteId}
                    toggle={toggle}
                    refetch={refetch}
                  />
                </div>
              )}
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </Modal>
  );
};

export default EditCardModule;