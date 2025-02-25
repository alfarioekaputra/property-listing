import { column, defineDb, defineTable } from 'astro:db';

const CustomerInquiry = defineTable({
  columns: {
    id: column.number({primaryKey:true, autoincrement:true}),
    property: column.text(),
    name: column.text(),
    email: column.text(),
    phone: column.text(),
    message: column.text(),
    status: column.text({default: 'New'}),
    submittedAt: column.date({default: new Date()}),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    CustomerInquiry
  }
});
