---
title: leetcode - 181. Employees Earning More Than Their Managers
date: 2021-04-12 17:04:03
category: sql
thumbnail: { thumbnailSrc }
draft: false
---

## 문제

```
The Employee table holds all employees including their managers. Every employee has an Id, and there is also a column for the manager Id.

+----+-------+--------+-----------+
| Id | Name  | Salary | ManagerId |
+----+-------+--------+-----------+
| 1  | Joe   | 70000  | 3         |
| 2  | Henry | 80000  | 4         |
| 3  | Sam   | 60000  | NULL      |
| 4  | Max   | 90000  | NULL      |
+----+-------+--------+-----------+
Given the Employee table, write a SQL query that finds out employees who earn more than their managers. For the above table, Joe is the only employee who earns more than his manager.

+----------+
| Employee |
+----------+
| Joe      |
+----------+
```

위와 같은 테이블에서 manager보다 더 많은 월급을 받는 사람을 찾아내는 SQL 문제입니다.
Join이나 Subquery를 이용하여 풀 수 있습니다.

## 풀이

### Use Join

```sql
SELECT a.Name as Employee
FROM Employee a
    JOIN Employee b
    on a.ManagerId = b.Id
WHERE a.Salary > b.Salary
```

### USE Subquery

```sql
SELECT Name as Employee
FROM Employee a
WHERE Salary > (SELECT Salary
                FROM Employee
                WHERE a.ManagerId = ManagerId)
```
