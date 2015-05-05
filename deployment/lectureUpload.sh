
#Sample call
#sh lectureUpload.sh 554851833aaa6db448c58c2a ../test/course/testUploadFiles/good_sample.zip 1421938502

#Sample unzipped folder call
#sh lectureUpload.sh 554851833aaa6db448c58c2a /home/ryan/Desktop/New 1421938502

#Just get all course info for you so you can get a course id. Doesnt do it if you supply arguments
if test -z "$3"; then
	curl localhost:3000/course 
fi

if test -z "$1"; then
	read -p "Enter a course_id listed above: " course_id
else
	course_id=$1
fi

if test -z "$2"; then
	read -p "Enter the location of your zip file: " filename
else
	filename=$2
fi

if test -z "$3"; then
	read -p "What is the start time: " start_time
else
	start_time=$3
fi


if [ -d $filename ]; then
    echo "$filename is a directory. Will have to zip"

    foldername=$filename
	parentdir="$(dirname "$filename")"
	filename=$parentdir"/lecture.zip"

	cd $foldername

	for i in *
	do
	    echo "Doing somthing to $i"
	    zip -r $filename $i
	done

	echo $filename

elif [ -f $filename ]; then
    echo "$filename is a file"
else
    echo "$filename is not valid"
    exit 1
fi


curl -F "start_time="+$start_time -F "upload=@"$filename localhost:3000/course/$course_id/lecture

echo "Removing zipped folder "$filename

rm $filename