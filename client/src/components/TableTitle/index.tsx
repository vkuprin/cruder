import styles from './index.module.scss';

interface TableTitleProps {
    title: string;
}

const TableTitle = ({ title }: TableTitleProps) => (
  <div className={styles.tableTitle}>
    <h3>{title}</h3>
  </div>
);

export default TableTitle;
