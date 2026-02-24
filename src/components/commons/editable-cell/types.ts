export interface EditableCellProps {
  value: string;
  placeholder?: string;
  isEditing: boolean;
  editValue: string;
  isSaving?: boolean;
  onStartEdit: () => void;
  onEditChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}
