import { Field, CollectionConfig } from "payload/types";
import { isAdminOrCreatedBy, isAuthenticated } from "../utils/Access";

const Expense: CollectionConfig = {
  slug: "Expense",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: ["category", "baseCategory"],
      label: "Category",
      required: true,
    },
    {
      name: "amount",
      type: "number",
      label: "Amount",
      required: true,
    },
    {
      name: "date",
      type: "date",
      label: "Date",
      required: true,
    },
    {
      name: "note",
      label: "Note",
      type: "text",
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: data => Boolean(data?.createdBy)
      },
    },
  ],
  access: {
    read: isAdminOrCreatedBy,
    update: isAdminOrCreatedBy,
    delete: isAdminOrCreatedBy,
  },
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create') {
          if (req.user) {
            data.createdBy = req.user.id;
            return data;
          }
        }
      },
    ],
    
  },
}

export default Expense;