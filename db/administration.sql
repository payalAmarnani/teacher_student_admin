

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


--
-- Database: `administration`
--
CREATE DATABASE IF NOT EXISTS `administration` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `administration`;
-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `student_email` varchar(255) NOT NULL,
  `suspended` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--


-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `teacher_email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Table structure for table `teacher_student_relation`
--

CREATE TABLE `teacher_student_relation` (
  `id` int(11) NOT NULL,
  `student_email` varchar(255) NOT NULL,
  `teacher_email` varchar(255) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_email` (`student_email`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `teacher_email` (`teacher_email`);

--
-- Indexes for table `teacher_student_relation`
--
ALTER TABLE `teacher_student_relation`
  ADD PRIMARY KEY (`student_email`,`teacher_email`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `teacher_email` (`teacher_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `teacher_student_relation`
--
ALTER TABLE `teacher_student_relation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `teacher_student_relation`
--
ALTER TABLE `teacher_student_relation`
  ADD CONSTRAINT `teacher_student_relation_ibfk_1` FOREIGN KEY (`student_email`) REFERENCES `student` (`student_email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_student_relation_ibfk_2` FOREIGN KEY (`teacher_email`) REFERENCES `teacher` (`teacher_email`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
